/**
 * Sanitize and validate user inputs
 */

/**
 * Sanitize string input by removing potentially harmful characters
 * @param {string} input - String to sanitize
 * @param {number} maxLength - Maximum allowed length
 * @returns {string} - Sanitized string
 */
export function sanitizeString(input, maxLength = 255) {
    if (typeof input !== 'string') {
        return '';
    }
    
    return input
        .trim()
        .slice(0, maxLength)
        .replace(/[<>]/g, ''); // Remove angle brackets to prevent HTML injection
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
export function isValidEmail(email) {
    if (typeof email !== 'string') {
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate phone number format
 * @param {string} phone - Phone to validate
 * @returns {boolean} - True if valid phone format
 */
export function isValidPhone(phone) {
    if (!phone || typeof phone !== 'string') {
        return false;
    }
    
    // Remove all non-numeric characters for validation
    const cleaned = phone.replace(/\D/g, '');
    
    // Must have at least 10 digits (can have more for international)
    return cleaned.length >= 10 && cleaned.length <= 15;
}

/**
 * Validate timezone string
 * @param {string} timezone - IANA timezone identifier
 * @returns {boolean} - True if valid timezone
 */
export function isValidTimezone(timezone) {
    if (typeof timezone !== 'string') {
        return false;
    }
    
    try {
        Intl.DateTimeFormat(undefined, { timeZone: timezone });
        return true;
    } catch (err) {
        return false;
    }
}

/**
 * Validate and sanitize booking input
 * @param {Object} data - Booking data
 * @returns {Object} - Validation result
 */
export function validateBookingInput(data) {
    const errors = [];
    
    // Validate name
    if (!data.name || typeof data.name !== 'string') {
        errors.push("Name is required");
    } else if (data.name.trim().length < 2) {
        errors.push("Name must be at least 2 characters");
    } else if (data.name.length > 100) {
        errors.push("Name must be less than 100 characters");
    }
    
    // Validate email
    if (!data.email || typeof data.email !== 'string') {
        errors.push("Email is required");
    } else if (!isValidEmail(data.email)) {
        errors.push("Invalid email format");
    }
    
    // Validate phone (optional but must be valid if provided)
    if (data.phone && !isValidPhone(data.phone)) {
        errors.push("Invalid phone number format");
    }
    
    // Validate date
    if (!data.date || typeof data.date !== 'string') {
        errors.push("Date is required");
    }
    
    // Validate timezone (optional)
    if (data.timezone && !isValidTimezone(data.timezone)) {
        errors.push("Invalid timezone");
    }
    
    if (errors.length > 0) {
        return {
            valid: false,
            errors
        };
    }
    
    return {
        valid: true,
        sanitized: {
            name: sanitizeString(data.name, 100),
            email: data.email.toLowerCase().trim(),
            phone: data.phone ? sanitizeString(data.phone, 20) : null,
            date: data.date,
            timezone: data.timezone || 'UTC'
        }
    };
}