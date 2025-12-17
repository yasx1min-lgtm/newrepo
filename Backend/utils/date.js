import { DateTime } from 'luxon';

/**
 * Convert UTC date to Hapio format with timezone
 * @param {Date|string} dateInput - UTC date
 * @param {string} timezone - IANA timezone (default: America/New_York)
 * @returns {string} - Formatted date string for Hapio API
 */
export function toHapioFormat(dateInput, timezone = "America/New_York") {
    const dt = DateTime.fromJSDate(
        dateInput instanceof Date ? dateInput : new Date(dateInput),
        { zone: 'utc' }
    );
    
    if (!dt.isValid) {
        throw new Error(`Invalid date provided to toHapioFormat: ${dt.invalidReason}`);
    }
    
    const converted = dt.setZone(timezone);
    
    return converted.toISO({ 
        suppressMilliseconds: true,
        includeOffset: true 
    });
}

/**
 * Add duration to a date
 * @param {Date|string} dateInput - Starting date
 * @param {number} minutes - Duration in minutes
 * @returns {Date} - New date with added duration
 */
export function addMinutes(dateInput, minutes) {
    const dt = DateTime.fromJSDate(
        dateInput instanceof Date ? dateInput : new Date(dateInput),
        { zone: 'utc' }
    );
    
    if (!dt.isValid) {
        throw new Error(`Invalid date provided to addMinutes: ${dt.invalidReason}`);
    }
    
    return dt.plus({ minutes }).toJSDate();
}

/**
 * Check if date is valid ISO 8601 format
 * @param {string} dateStr - Date string to validate
 * @returns {boolean} - True if valid ISO format
 */
export function isValidISO(dateStr) {
    const dt = DateTime.fromISO(dateStr);
    return dt.isValid;
}

/**
 * Parse date string to DateTime object
 * @param {string} dateStr - Date string
 * @returns {DateTime} - Luxon DateTime object
 */
export function parseDate(dateStr) {
    return DateTime.fromISO(dateStr);
}