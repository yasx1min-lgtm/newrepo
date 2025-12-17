import axios from "axios";
import { getZoomAccessToken } from "./getToken.js";
import { logger } from "../../utils/logger.js";

/**
 * Delete a Zoom meeting (for rollback purposes)
 * @param {string} meetingId - Zoom meeting ID
 * @returns {Promise<boolean>} - True if deleted successfully
 */
export async function deleteZoomMeeting(meetingId) {
    try {
        if (!meetingId) {
            logger.warn("No meeting ID provided for deletion");
            return false;
        }

        const token = await getZoomAccessToken();
        
        await axios.delete(
            `https://api.zoom.us/v2/meetings/${meetingId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        logger.info("Zoom meeting deleted successfully (rollback)", { 
            meetingId 
        });

        return true;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        
        logger.error("Failed to delete Zoom meeting", { 
            meetingId, 
            error: errorMessage 
        });

        return false;
    }
}