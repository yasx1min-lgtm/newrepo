const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Logger utility with different log levels
 */
export const logger = {
    /**
     * Debug level logging (only in development)
     */
    debug: (...args) => {
        if (isDevelopment) {
            console.log("[DEBUG]", ...args);
        }
    },

    /**
     * Info level logging
     */
    info: (...args) => {
        console.log("[INFO]", ...args);
    },

    /**
     * Warning level logging
     */
    warn: (...args) => {
        console.warn("[WARN]", ...args);
    },

    /**
     * Error level logging
     */
    error: (...args) => {
        console.error("[ERROR]", ...args);
    },

    /**
     * Critical error logging
     */
    critical: (...args) => {
        console.error("[CRITICAL]", ...args);
    }
};