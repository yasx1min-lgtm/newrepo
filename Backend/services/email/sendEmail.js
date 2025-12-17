import nodemailer from "nodemailer";
import { DateTime } from "luxon";
import { logger } from "../../utils/logger.js";

/**
 * Create email transporter based on environment
 */
function createTransporter() {
    // For production, use real SMTP (Gmail, SendGrid, etc.)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }
    
    // For development, use Ethereal (test email service)
    logger.warn("Using development email mode (Ethereal)");
    return nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: process.env.ETHEREAL_USER || "ethereal.user@ethereal.email",
            pass: process.env.ETHEREAL_PASS || "ethereal.pass"
        }
    });
}

/**
 * Generate ICS calendar file content
 */
function generateICSContent(booking, attendees = []) {
    const start = DateTime.fromISO(booking.starts_at);
    const end = DateTime.fromISO(booking.ends_at);
    
    const icsDate = (dt) => dt.toFormat("yyyyMMdd'T'HHmmss'Z'");
    
    // Build attendees list
    const attendeeLines = attendees.map(email => 
        `ATTENDEE;CN=${email};ROLE=REQ-PARTICIPANT:mailto:${email}`
    ).join('\r\n');
    
    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Booking System//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${booking.id}@booking-system.com
DTSTAMP:${icsDate(DateTime.utc())}
DTSTART:${icsDate(start)}
DTEND:${icsDate(end)}
SUMMARY:Consultation Meeting
DESCRIPTION:Join your consultation meeting: ${booking.meeting.join_url}
LOCATION:Zoom Meeting
STATUS:CONFIRMED
SEQUENCE:0
${attendeeLines}
BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:Reminder: Meeting in 15 minutes
END:VALARM
END:VEVENT
END:VCALENDAR`;
}

/**
 * Generate HTML email template for CUSTOMER
 */
function generateCustomerEmailHTML(name, booking, userTimezone) {
    const start = DateTime.fromISO(booking.starts_at).setZone(userTimezone);
    const end = DateTime.fromISO(booking.ends_at).setZone(userTimezone);
    
    const formattedDate = start.toLocaleString({
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    
    const formattedTime = `${start.toLocaleString(DateTime.TIME_SIMPLE)} - ${end.toLocaleString(DateTime.TIME_SIMPLE)}`;
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px;">✅ Booking Confirmed!</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <p style="margin: 0 0 20px 0; font-size: 16px; color: #333333;">
                                Hi <strong>${name}</strong>,
                            </p>
                            
                            <p style="margin: 0 0 30px 0; font-size: 16px; color: #333333;">
                                Your consultation has been successfully scheduled! Here are your meeting details:
                            </p>
                            
                            <!-- Meeting Details Box -->
                            <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
                                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 8px 0; font-size: 14px; color: #666666;">
                                            <strong>📅 Date:</strong>
                                        </td>
                                        <td style="padding: 8px 0; font-size: 14px; color: #333333;">
                                            ${formattedDate}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; font-size: 14px; color: #666666;">
                                            <strong>🕐 Time:</strong>
                                        </td>
                                        <td style="padding: 8px 0; font-size: 14px; color: #333333;">
                                            ${formattedTime}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; font-size: 14px; color: #666666;">
                                            <strong>🌍 Timezone:</strong>
                                        </td>
                                        <td style="padding: 8px 0; font-size: 14px; color: #333333;">
                                            ${userTimezone}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; font-size: 14px; color: #666666;">
                                            <strong>⏱️ Duration:</strong>
                                        </td>
                                        <td style="padding: 8px 0; font-size: 14px; color: #333333;">
                                            30 minutes
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <!-- Zoom Link Button -->
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${booking.meeting.join_url}" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                                    🎥 Join Zoom Meeting
                                </a>
                            </div>
                            
                            ${booking.meeting.password ? `
                            <div style="background-color: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 4px; margin: 20px 0;">
                                <p style="margin: 0; font-size: 14px; color: #856404;">
                                    <strong>Meeting Password:</strong> ${booking.meeting.password}
                                </p>
                            </div>
                            ` : ''}
                            
                            <!-- Important Notes -->
                            <div style="background-color: #e7f3ff; border: 1px solid #2196f3; padding: 15px; border-radius: 4px; margin: 20px 0;">
                                <p style="margin: 0 0 10px 0; font-size: 14px; color: #0d47a1; font-weight: bold;">
                                    📌 Important Notes:
                                </p>
                                <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #1565c0;">
                                    <li>Please join 5 minutes before the scheduled time</li>
                                    <li>A calendar invite (.ics file) is attached to this email</li>
                                    <li>You'll receive a reminder 15 minutes before the meeting</li>
                                    <li>Make sure you have a stable internet connection</li>
                                </ul>
                            </div>
                            
                            <p style="margin: 30px 0 0 0; font-size: 14px; color: #666666;">
                                Need to reschedule or cancel? Please contact us at 
                                <a href="mailto:${process.env.SUPPORT_EMAIL || 'support@example.com'}" style="color: #667eea;">
                                    ${process.env.SUPPORT_EMAIL || 'support@example.com'}
                                </a>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 40px; text-align: center; background-color: #f8f9fa; border-radius: 0 0 8px 8px;">
                            <p style="margin: 0; font-size: 12px; color: #999999;">
                                © ${new Date().getFullYear()} Booking System. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}

/**
 * Generate HTML email template for ADMIN
 */
function generateAdminEmailHTML(customerName, customerEmail, customerPhone, booking, userTimezone) {
    const start = DateTime.fromISO(booking.starts_at).setZone(userTimezone);
    const end = DateTime.fromISO(booking.ends_at).setZone(userTimezone);
    
    const formattedDate = start.toLocaleString({
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    
    const formattedTime = `${start.toLocaleString(DateTime.TIME_SIMPLE)} - ${end.toLocaleString(DateTime.TIME_SIMPLE)}`;
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Booking Notification</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px;">🔔 New Booking Alert!</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <p style="margin: 0 0 30px 0; font-size: 16px; color: #333333;">
                                You have a new consultation booking. Here are the details:
                            </p>
                            
                            <!-- Customer Details -->
                            <div style="background-color: #f8f9fa; border-left: 4px solid #28a745; padding: 20px; margin-bottom: 20px; border-radius: 4px;">
                                <h3 style="margin: 0 0 15px 0; color: #333; font-size: 16px;">👤 Customer Information</h3>
                                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 8px 0; font-size: 14px; color: #666666; width: 120px;">
                                            <strong>Name:</strong>
                                        </td>
                                        <td style="padding: 8px 0; font-size: 14px; color: #333333;">
                                            ${customerName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; font-size: 14px; color: #666666;">
                                            <strong>Email:</strong>
                                        </td>
                                        <td style="padding: 8px 0; font-size: 14px; color: #333333;">
                                            <a href="mailto:${customerEmail}" style="color: #28a745;">${customerEmail}</a>
                                        </td>
                                    </tr>
                                    ${customerPhone ? `
                                    <tr>
                                        <td style="padding: 8px 0; font-size: 14px; color: #666666;">
                                            <strong>Phone:</strong>
                                        </td>
                                        <td style="padding: 8px 0; font-size: 14px; color: #333333;">
                                            <a href="tel:${customerPhone}" style="color: #28a745;">${customerPhone}</a>
                                        </td>
                                    </tr>
                                    ` : ''}
                                </table>
                            </div>
                            
                            <!-- Meeting Details -->
                            <div style="background-color: #e7f3ff; border-left: 4px solid #2196f3; padding: 20px; margin-bottom: 20px; border-radius: 4px;">
                                <h3 style="margin: 0 0 15px 0; color: #333; font-size: 16px;">📅 Meeting Details</h3>
                                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 8px 0; font-size: 14px; color: #666666; width: 120px;">
                                            <strong>Date:</strong>
                                        </td>
                                        <td style="padding: 8px 0; font-size: 14px; color: #333333;">
                                            ${formattedDate}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; font-size: 14px; color: #666666;">
                                            <strong>Time:</strong>
                                        </td>
                                        <td style="padding: 8px 0; font-size: 14px; color: #333333;">
                                            ${formattedTime}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; font-size: 14px; color: #666666;">
                                            <strong>Timezone:</strong>
                                        </td>
                                        <td style="padding: 8px 0; font-size: 14px; color: #333333;">
                                            ${userTimezone}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; font-size: 14px; color: #666666;">
                                            <strong>Booking ID:</strong>
                                        </td>
                                        <td style="padding: 8px 0; font-size: 14px; color: #333333;">
                                            ${booking.id}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <!-- Zoom Meeting Links -->
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${booking.meeting.start_url}" style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 5px;">
                                    🎥 Start Meeting (Host)
                                </a>
                                <br>
                                <a href="${booking.meeting.join_url}" style="display: inline-block; padding: 15px 30px; background: #6c757d; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; margin: 5px;">
                                    Join as Participant
                                </a>
                            </div>
                            
                            ${booking.meeting.password ? `
                            <div style="background-color: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 4px; margin: 20px 0;">
                                <p style="margin: 0; font-size: 14px; color: #856404;">
                                    <strong>Meeting Password:</strong> ${booking.meeting.password}
                                </p>
                            </div>
                            ` : ''}
                            
                            <!-- Quick Actions -->
                            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 4px; margin-top: 30px;">
                                <h3 style="margin: 0 0 15px 0; color: #333; font-size: 16px;">⚡ Quick Actions</h3>
                                <p style="margin: 0; font-size: 14px; color: #666;">
                                    • <strong>Add to Calendar:</strong> The .ics file is attached to this email<br>
                                    • <strong>Contact Customer:</strong> <a href="mailto:${customerEmail}" style="color: #28a745;">${customerEmail}</a><br>
                                    • <strong>Zoom Meeting ID:</strong> ${booking.meeting.id}
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 40px; text-align: center; background-color: #f8f9fa; border-radius: 0 0 8px 8px;">
                            <p style="margin: 0; font-size: 12px; color: #999999;">
                                © ${new Date().getFullYear()} Booking System - Admin Notification
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}

/**
 * Send booking confirmation email to CUSTOMER
 */
export async function sendBookingConfirmation(customerEmail, customerName, booking, userTimezone = 'UTC') {
    try {
        const transporter = createTransporter();
        
        const icsContent = generateICSContent(booking, [customerEmail]);
        const htmlContent = generateCustomerEmailHTML(customerName, booking, userTimezone);
        
        const mailOptions = {
            from: `"${process.env.EMAIL_FROM_NAME || 'Booking System'}" <${process.env.EMAIL_FROM || 'noreply@booking-system.com'}>`,
            to: customerEmail,
            subject: `✅ Your Consultation is Confirmed - ${DateTime.fromISO(booking.starts_at).setZone(userTimezone).toLocaleString(DateTime.DATE_MED)}`,
            html: htmlContent,
            attachments: [
                {
                    filename: 'consultation.ics',
                    content: icsContent,
                    contentType: 'text/calendar; charset=utf-8; method=REQUEST'
                }
            ]
        };
        
        const info = await transporter.sendMail(mailOptions);
        
        logger.info("Customer confirmation email sent", {
            to: customerEmail,
            messageId: info.messageId,
            previewUrl: nodemailer.getTestMessageUrl(info)
        });
        
        return {
            success: true,
            messageId: info.messageId,
            previewUrl: nodemailer.getTestMessageUrl(info)
        };
        
    } catch (error) {
        logger.error("Failed to send customer confirmation email", {
            error: error.message,
            customerEmail
        });
        
        throw new Error(`Failed to send confirmation email: ${error.message}`);
    }
}

/**
 * Send booking notification email to ADMIN
 */
export async function sendAdminNotification(customerEmail, customerName, customerPhone, booking, userTimezone = 'UTC') {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        
        if (!adminEmail) {
            logger.warn("ADMIN_EMAIL not configured, skipping admin notification");
            return { success: false, reason: "ADMIN_EMAIL not configured" };
        }
        
        const transporter = createTransporter();
        
        // Include both admin and customer in calendar invite
        const icsContent = generateICSContent(booking, [adminEmail, customerEmail]);
        const htmlContent = generateAdminEmailHTML(customerName, customerEmail, customerPhone, booking, userTimezone);
        
        const mailOptions = {
            from: `"${process.env.EMAIL_FROM_NAME || 'Booking System'}" <${process.env.EMAIL_FROM || 'noreply@booking-system.com'}>`,
            to: adminEmail,
            subject: `🔔 New Booking: ${customerName} - ${DateTime.fromISO(booking.starts_at).setZone(userTimezone).toLocaleString(DateTime.DATE_MED)}`,
            html: htmlContent,
            attachments: [
                {
                    filename: 'consultation.ics',
                    content: icsContent,
                    contentType: 'text/calendar; charset=utf-8; method=REQUEST'
                }
            ]
        };
        
        const info = await transporter.sendMail(mailOptions);
        
        logger.info("Admin notification email sent", {
            to: adminEmail,
            messageId: info.messageId,
            previewUrl: nodemailer.getTestMessageUrl(info)
        });
        
        return {
            success: true,
            messageId: info.messageId,
            previewUrl: nodemailer.getTestMessageUrl(info)
        };
        
    } catch (error) {
        logger.error("Failed to send admin notification email", {
            error: error.message,
            adminEmail: process.env.ADMIN_EMAIL
        });
        
        return { success: false, error: error.message };
    }
}

/**
 * Send booking reminder email (15 minutes before)
 */
export async function sendBookingReminder(customerEmail, customerName, booking, userTimezone = 'UTC') {
    try {
        const transporter = createTransporter();
        const start = DateTime.fromISO(booking.starts_at).setZone(userTimezone);
        
        const mailOptions = {
            from: `"${process.env.EMAIL_FROM_NAME || 'Booking System'}" <${process.env.EMAIL_FROM || 'noreply@booking-system.com'}>`,
            to: customerEmail,
            subject: `⏰ Reminder: Your meeting starts in 15 minutes`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #667eea;">Meeting Reminder</h2>
                    <p>Hi <strong>${customerName}</strong>,</p>
                    <p>Your consultation meeting starts in <strong>15 minutes</strong>!</p>
                    <p><strong>Time:</strong> ${start.toLocaleString(DateTime.DATETIME_FULL)}</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${booking.meeting.join_url}" 
                           style="display: inline-block; padding: 15px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                            Join Meeting Now
                        </a>
                    </div>
                </div>
            `
        };
        
        await transporter.sendMail(mailOptions);
        logger.info("Booking reminder email sent", { to: customerEmail });
        
        return { success: true };
        
    } catch (error) {
        logger.error("Failed to send reminder email", {
            error: error.message,
            customerEmail
        });
        
        return { success: false, error: error.message };
    }
}