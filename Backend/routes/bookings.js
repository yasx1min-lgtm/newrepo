import express from "express";
import { createHapioBooking } from "../services/hapio/createBooking.js";
import { deleteHapioBooking } from "../services/hapio/deleteBooking.js";
import { createZoomMeeting } from "../services/zoom/createMeeting.js";
import { deleteZoomMeeting } from "../services/zoom/deleteMeeting.js";
import { getAvailableSlots } from "../services/hapio/getAvailableSlots.js";
import { sendBookingConfirmation, sendAdminNotification } from "../services/email/sendEmail.js";
import { validateDateInput } from "../utils/validateDate.js";
import { validateBookingInput } from "../utils/sanitizer.js";
import { logger } from "../utils/logger.js";

const router = express.Router();

/**
 * POST /api/bookings
 * Create a new booking with Hapio and Zoom
 */
router.post("/", async (req, res) => {
    let hapioBooking = null;
    let zoomMeeting = null;
    let rollbackAttempted = false;
    
    try {
        // Validate and sanitize input
        const inputValidation = validateBookingInput(req.body);
        if (!inputValidation.valid) {
            return res.status(400).json({
                success: false,
                message: "Invalid input",
                errors: inputValidation.errors
            });
        }

        const { name, email, phone, date, timezone } = inputValidation.sanitized;

        // Validate date
        const dateValidation = validateDateInput(date);
        if (!dateValidation.valid) {
            return res.status(400).json({
                success: false,
                message: dateValidation.error
            });
        }

        logger.info("Processing booking request", { name, email, date, timezone });

        // STEP 1: Create Hapio booking first (checks availability)
        try {
            hapioBooking = await createHapioBooking(name, email, date);
        } catch (hapioError) {
            logger.error("Hapio booking failed", { error: hapioError.message });
            return res.status(500).json({
                success: false,
                message: hapioError.message
            });
        }

        // STEP 2: Create Zoom meeting (only if Hapio succeeded)
        try {
            zoomMeeting = await createZoomMeeting(name, email, date);
        } catch (zoomError) {
            logger.error("Zoom meeting creation failed, initiating rollback", { 
                error: zoomError.message 
            });
            
            rollbackAttempted = true;
            
            // Attempt to rollback Hapio booking
            const rollbackSuccess = await deleteHapioBooking(hapioBooking.id);
            
            if (!rollbackSuccess) {
                logger.critical("Rollback failed - manual intervention required", {
                    hapioBookingId: hapioBooking.id,
                    customerEmail: email
                });
                
                return res.status(500).json({
                    success: false,
                    message: "Booking created but video meeting failed. Our team has been notified and will contact you shortly.",
                    critical: true,
                    bookingId: hapioBooking.id
                });
            }
            
            return res.status(500).json({
                success: false,
                message: zoomError.message
            });
        }

        // STEP 3: Send confirmation emails (non-blocking)
        const bookingData = {
            id: hapioBooking.id,
            starts_at: hapioBooking.starts_at,
            ends_at: hapioBooking.ends_at,
            meeting: {
                id: zoomMeeting.id,
                join_url: zoomMeeting.join_url,
                start_url: zoomMeeting.start_url,
                password: zoomMeeting.password
            }
        };

        // Send customer confirmation email
        sendBookingConfirmation(email, name, bookingData, timezone || 'UTC')
            .then((emailResult) => {
                logger.info("Customer confirmation email sent", {
                    to: email,
                    messageId: emailResult.messageId,
                    previewUrl: emailResult.previewUrl
                });
            })
            .catch((emailError) => {
                logger.error("Failed to send customer confirmation email", {
                    error: emailError.message,
                    customerEmail: email
                });
            });

        // Send admin notification email
        sendAdminNotification(email, name, phone, bookingData, timezone || 'UTC')
            .then((adminEmailResult) => {
                if (adminEmailResult.success) {
                    logger.info("Admin notification email sent", {
                        to: process.env.ADMIN_EMAIL,
                        messageId: adminEmailResult.messageId,
                        previewUrl: adminEmailResult.previewUrl
                    });
                } else {
                    logger.warn("Admin notification skipped", {
                        reason: adminEmailResult.reason
                    });
                }
            })
            .catch((adminEmailError) => {
                logger.error("Failed to send admin notification email", {
                    error: adminEmailError.message
                });
            });

        // SUCCESS - Both bookings created
        logger.info("Booking completed successfully", {
            hapioId: hapioBooking.id,
            zoomId: zoomMeeting.id,
            customerEmail: email
        });

        res.status(201).json({
            success: true,
            data: {
                booking: {
                    id: hapioBooking.id,
                    starts_at: hapioBooking.starts_at,
                    ends_at: hapioBooking.ends_at
                },
                meeting: {
                    id: zoomMeeting.id,
                    join_url: zoomMeeting.join_url,
                    start_url: zoomMeeting.start_url,
                    password: zoomMeeting.password,
                    start_time: zoomMeeting.start_time
                }
            },
            message: "Booking created successfully. Confirmation emails sent!"
        });

    } catch (error) {
        logger.error("Unexpected error in booking process", { 
            error: error.message,
            stack: error.stack
        });
        
        // If we have partial bookings and haven't rolled back yet, try now
        if (!rollbackAttempted) {
            if (zoomMeeting?.id) {
                await deleteZoomMeeting(zoomMeeting.id);
            }
            if (hapioBooking?.id) {
                await deleteHapioBooking(hapioBooking.id);
            }
        }
        
        res.status(500).json({
            success: false,
            message: "An unexpected error occurred. Please try again."
        });
    }
});

/**
 * GET /api/bookings/available-slots
 * Get available booking slots for a specific date
 */
router.get("/available-slots", async (req, res) => {
    try {
        const { date } = req.query;
        
        if (!date) {
            return res.status(400).json({
                success: false,
                message: "Date parameter is required (format: YYYY-MM-DD)"
            });
        }

        // Validate date format
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format. Expected YYYY-MM-DD"
            });
        }
        
        logger.info("Fetching available slots", { date });
        
        const result = await getAvailableSlots(date);
        
        res.json({
            success: true,
            data: result,
            message: `Found ${result.total} available slots`
        });
        
    } catch (error) {
        logger.error("Error fetching available slots", { 
            error: error.message 
        });
        
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;