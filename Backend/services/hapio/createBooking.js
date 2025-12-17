import axios from "axios";
import { toHapioFormat, addMinutes } from "../../utils/date.js";
import { logger } from "../../utils/logger.js";

const HAPIO_BASE_URL = "https://eu-central-1.hapio.net/v1";
const BOOKING_DURATION_MINUTES = 30;

/**
 * Create a booking in Hapio system
 * @param {string} name - Customer name
 * @param {string} email - Customer email
 * @param {Date|string} startsAt - Booking start time (UTC)
 * @returns {Promise<Object>} - Hapio booking data
 * @throws {Error} - If booking creation fails
 */
export async function createHapioBooking(name, email, startsAt) {
    try {
        const timezone = "America/New_York";
        
        // Convert UTC date to Date object
        const utcDate = startsAt instanceof Date ? startsAt : new Date(startsAt);
        
        // Format dates for Hapio API with NY timezone
        const starts = toHapioFormat(utcDate, timezone);
        const endsDate = addMinutes(utcDate, BOOKING_DURATION_MINUTES);
        const ends = toHapioFormat(endsDate, timezone);

        logger.debug("Creating Hapio booking", {
            name,
            email,
            startsAt: starts,
            endsAt: ends,
            serviceId: process.env.HAPIO_SERVICE_ID,
            locationId: process.env.HAPIO_LOCATION_ID
        });

        const response = await axios.post(
            `${HAPIO_BASE_URL}/bookings`,
            {
                service_id: process.env.HAPIO_SERVICE_ID,
                location_id: process.env.HAPIO_LOCATION_ID,
                starts_at: starts,
                ends_at: ends,
                customer: { 
                    name, 
                    email 
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HAPIO_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        logger.info("Hapio booking created successfully", { 
            bookingId: response.data.id 
        });

        return {
            id: response.data.id,
            starts_at: response.data.starts_at,
            ends_at: response.data.ends_at,
            service_id: response.data.service_id,
            location_id: response.data.location_id
        };

    } catch (error) {
        const status = error.response?.status;
        const errorData = error.response?.data;
        const errorMessage = errorData?.message || error.message;

        logger.error("Failed to create Hapio booking", { 
            status, 
            error: errorMessage,
            details: errorData
        });

        // Handle specific Hapio errors
        if (status === 409) {
            throw new Error("This time slot is no longer available. Please choose another time.");
        }

        if (status === 422) {
            throw new Error("Invalid booking data. Please check your input and try again.");
        }

        throw new Error(`Failed to create booking: ${errorMessage}`);
    }
}