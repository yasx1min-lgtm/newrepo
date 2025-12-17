import { DateTime } from 'luxon';

/**
 * Validate booking date input
 * @param {string} dateStr - ISO 8601 date string
 * @returns {Object} - Validation result with valid flag, date, or error
 */
export function validateDateInput(dateStr) {
    // Check if date string exists and is a string
    if (!dateStr || typeof dateStr !== 'string') {
        return { 
            valid: false, 
            error: "Date is required and must be a string" 
        };
    }

    // Parse date using Luxon
    const dt = DateTime.fromISO(dateStr);
    
    if (!dt.isValid) {
        return { 
            valid: false, 
            error: `Invalid date format: ${dt.invalidReason}. Expected ISO 8601 format (e.g., 2025-12-15T14:00:00Z)` 
        };
    }

    // Ensure timezone info is present
    if (!dateStr.endsWith('Z') && !dateStr.match(/[+-]\d{2}:\d{2}$/)) {
        return { 
            valid: false, 
            error: "Date must include timezone information (UTC 'Z' or offset like '+05:00')" 
        };
    }

    // Check if date is in the past
    const now = DateTime.utc();
    if (dt < now) {
        return { 
            valid: false, 
            error: "Cannot book appointments in the past" 
        };
    }

    // Check if date is too far in the future (6 months limit)
    const maxFuture = now.plus({ months: 6 });
    if (dt > maxFuture) {
        return { 
            valid: false, 
            error: "Cannot book appointments more than 6 months in advance" 
        };
    }

    // Validate that time is on 30-minute intervals (00 or 30 minutes)
    const minutes = dt.minute;
    if (minutes !== 0 && minutes !== 30) {
        return { 
            valid: false, 
            error: "Appointment times must be on 30-minute intervals (e.g., 14:00 or 14:30)" 
        };
    }

    return { 
        valid: true, 
        date: dt.toJSDate() 
    };
}