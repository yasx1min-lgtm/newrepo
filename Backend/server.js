import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import bookingsRouter from "./routes/bookings.js";
import { logger } from "./utils/logger.js";

dotenv.config();

const requiredEnvVars = [
    'ZOOM_CLIENT_ID',
    'ZOOM_CLIENT_SECRET',
    'ZOOM_ACCOUNT_ID',
    'HAPIO_API_KEY',
    'HAPIO_SERVICE_ID',
    'HAPIO_LOCATION_ID'
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0) {
    logger.critical("Missing required environment variables:", missingEnvVars);
    process.exit(1);
}

const app = express();

// Trust proxy (important for Codespaces and production behind proxy)
app.set('trust proxy', 1);

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"]
        }
    }
}));

app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "Too many requests from this IP, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false,
    validate: {
        xForwardedForHeader: false
    }
});

app.use("/api/", limiter);

const bookingLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        message: "Booking limit reached. Please try again later."
    },
    validate: {
        xForwardedForHeader: false
    }
});

app.use("/api/bookings", bookingLimiter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/bookings", bookingsRouter);

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        status: "healthy",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'production'
    });
});

app.use("/api/*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found"
    });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use((err, req, res, next) => {
    logger.error("Unhandled error:", {
        error: err.message,
        stack: err.stack,
        path: req.path
    });

    res.status(err.status || 500).json({
        success: false,
        message: process.env.NODE_ENV === 'development' 
            ? err.message 
            : "An internal server error occurred"
    });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    logger.info("=".repeat(60));
    logger.info(`Server running on http://localhost:${PORT}`);
    logger.info(`Environment: ${process.env.NODE_ENV || 'production'}`);
    logger.info("=".repeat(60));
    logger.info("\nAvailable Endpoints:");
    logger.info("   GET  /api/health - Health check");
    logger.info("   POST /api/bookings - Create a new booking");
    logger.info("   GET  /api/bookings/available-slots?date=YYYY-MM-DD - Get available slots");
    logger.info("=".repeat(60) + "\n");
});

const gracefulShutdown = () => {
    logger.info("\nShutting down gracefully...");
    server.close(() => {
        logger.info("Server closed");
        process.exit(0);
    });

    setTimeout(() => {
        logger.error("Forced shutdown");
        process.exit(1);
    }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

export default app;