import axios from "axios";
import { DateTime } from "luxon";
import { logger } from "../../utils/logger.js";

const HAPIO_BASE_URL = "https://eu-central-1.hapio.net/v1";

export async function getAvailableSlots(date) {
    try {
        const timezone = "America/New_York";
        
        const dt = DateTime.fromISO(date, { zone: timezone });
        
        if (!dt.isValid) {
            throw new Error(`Invalid date format: ${date}. Expected YYYY-MM-DD`);
        }

        // Format must be: Y-m-d\TH:i:sP (e.g., 2025-12-08T00:00:00-05:00)
        const from = dt.startOf('day').toFormat("yyyy-MM-dd'T'HH:mm:ssZZ");
        const to = dt.endOf('day').toFormat("yyyy-MM-dd'T'HH:mm:ssZZ");
        
        logger.debug("Fetching available slots", {
            date,
            from,
            to,
            timezone
        });
        
        const response = await axios.get(
            `${HAPIO_BASE_URL}/services/${process.env.HAPIO_SERVICE_ID}/bookable-slots`,
            {
                params: {
                    from,
                    to,
                    location: process.env.HAPIO_LOCATION_ID
                },
                headers: {
                    Authorization: `Bearer ${process.env.HAPIO_API_KEY}`
                }
            }
        );
        
        const slots = response.data.data || [];
        
        logger.info("Available slots retrieved", { 
            date,
            count: slots.length 
        });
        
        return {
            slots,
            total: slots.length,
            date
        };
        
    } catch (error) {
        const status = error.response?.status;
        const errorMessage = error.response?.data?.message || error.message;
        const errorDetails = error.response?.data?.errors;
        
        logger.error("Failed to fetch available slots", { 
            date,
            status,
            error: errorMessage,
            details: errorDetails
        });
        
        throw new Error(`Failed to fetch available slots: ${errorMessage}`);
    }
}