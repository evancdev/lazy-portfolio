import { googleDriveClient } from '../client.js';

/**
 * Sets up a webhook for a Google Drive file to receive notifications when it changes
 * @param fileId - The Google Drive file/document ID
 * @param webhookUrl - The URL to receive webhook notifications
 * @param channelId - Unique identifier for this webhook channel
 * @returns Channel information including expiration time
 */
export async function setupDriveWebhook(
  fileId: string,
  webhookUrl: string,
  channelId: string
) {
  try {
    const response = await googleDriveClient.files.watch({
      fileId,
      requestBody: {
        id: channelId,
        type: 'web_hook',
        address: webhookUrl,
      },
    });

    return {
      channelId: response.data.id,
      resourceId: response.data.resourceId,
      expiration: response.data.expiration,
    };
  } catch (error) {
    console.error('Error setting up Drive webhook:', error);
    throw error;
  }
}

/**
 * Stops a webhook channel
 * @param channelId - The channel ID to stop
 * @param resourceId - The resource ID from the watch response
 */
export async function stopDriveWebhook(channelId: string, resourceId: string) {
  try {
    await googleDriveClient.channels.stop({
      requestBody: {
        id: channelId,
        resourceId,
      },
    });
  } catch (error) {
    console.error('Error stopping Drive webhook:', error);
    throw error;
  }
}
