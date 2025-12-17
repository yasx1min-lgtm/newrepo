import axios from "axios";
import { logger } from "../../utils/logger.js";

const HAPIO_BASE_URL = "https://eu-central-1.hapio.net/v1";

/**
 * Delete a Hapio booking (for rollback purposes)
 * @param {string} bookingId - Hapio booking ID
 * @returns {Promise<boolean>} - True if deleted successfully
 */
export async function deleteHapioBooking(bookingId) {
    try {
        if (!bookingId) {
            logger.warn("No booking ID provided for deletion");
            return false;
        }

        await axios.delete(
            `${HAPIO_BASE_URL}/bookings/${bookingId}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.HAPIO_API_KEY}`
                }
            }
        );

        logger.info("Hapio booking deleted successfully (rollback)", { 
            bookingId 
        });

        return true;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        
        logger.error("Failed to delete Hapio booking", { 
            bookingId, 
            error: errorMessage 
        });

        return false;
    }
}