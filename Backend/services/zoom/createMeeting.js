import axios from "axios";
import { getZoomAccessToken } from "./getToken.js";
import { logger } from "../../utils/logger.js";

/**
 * Create a Zoom meeting
 * @param {string} name - Customer name
 * @param {string} email - Customer email
 * @param {Date|string} startsAt - Meeting start time (UTC)
 * @param {number} retryCount - Internal retry counter
 * @returns {Promise<Object>} - Zoom meeting data
 * @throws {Error} - If meeting creation fails
 */
export async function createZoomMeeting(name, email, startsAt, retryCount = 0) {
    try {
        const token = await getZoomAccessToken();
        
        // Convert to Date if string
        const date = startsAt instanceof Date ? startsAt : new Date(startsAt);
        
        // Use toISOString() directly for proper ISO 8601 UTC format
        const zoomDateTime = date.toISOString();

        logger.debug("Creating Zoom meeting", {
            name,
            email,
            zoomDateTime
        });

        const response = await axios.post(
            "https://api.zoom.us/v2/users/me/meetings",
            {
                topic: `Consultation with ${name}`,
                type: 2, // Scheduled meeting
                start_time: zoomDateTime,
                duration: 30,
                timezone: "UTC",
                settings: {
                    approval_type: 2, // No registration required
                    join_before_host: true,
                    host_video: true,
                    participant_video: true,
                    mute_upon_entry: false,
                    waiting_room: false
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        logger.info("Zoom meeting created successfully", { 
            meetingId: response.data.id 
        });

        return {
            id: response.data.id,
            join_url: response.data.join_url,
            start_url: response.data.start_url,
            password: response.data.password,
            start_time: response.data.start_time
        };

    } catch (error) {
        const status = error.response?.status;
        const errorMessage = error.response?.data?.message || error.message;

        // Retry once if token expired
        if (status === 401 && retryCount === 0) {
            logger.warn("Zoom token expired, retrying with fresh token");
            return createZoomMeeting(name, email, startsAt, 1);
        }

        // Handle rate limiting
        if (status === 429) {
            logger.error("Zoom API rate limit exceeded");
            throw new Error("Zoom API rate limit exceeded. Please try again later.");
        }

        logger.error("Failed to create Zoom meeting", { 
            status, 
            error: errorMessage 
        });

        throw new Error(`Failed to create Zoom meeting: ${errorMessage}`);
    }
}