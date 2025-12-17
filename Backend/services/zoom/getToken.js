import axios from "axios";

/**
 * Get Zoom OAuth access token
 * @returns {Promise<string>} - Access token
 * @throws {Error} - If token retrieval fails
 */
export async function getZoomAccessToken() {
    try {
        const credentials = Buffer.from(
            `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
        ).toString("base64");

        const response = await axios.post(
            "https://zoom.us/oauth/token",
            `grant_type=account_credentials&account_id=${process.env.ZOOM_ACCOUNT_ID}`,
            {
                headers: {
                    Authorization: `Basic ${credentials}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );

        if (!response.data?.access_token) {
            throw new Error("No access token received from Zoom");
        }

        return response.data.access_token;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        throw new Error(`Failed to get Zoom access token: ${message}`);
    }
}