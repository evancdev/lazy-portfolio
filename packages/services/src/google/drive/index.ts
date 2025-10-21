import { config } from 'dotenv';
import { resolve } from 'path';
import { setupDriveWebhook } from './webhook.js';

// Load .env from root
config({ path: resolve(process.cwd(), '.env') });

const webhookUrl = process.argv[2];
const channelId = process.env.DRIVE_WEBHOOK_CHANNEL_ID;
const fileId = process.env.GOOGLE_DOCS_ID;

if (!webhookUrl) {
  console.error('Usage: npm run setup-webhook <webhook-url>');
  process.exit(1);
}

if (!channelId) {
  console.error('Error: DRIVE_WEBHOOK_CHANNEL_ID not found in .env');
  process.exit(1);
}

if (!fileId) {
  console.error('Error: GOOGLE_DOCS_ID not found in .env');
  process.exit(1);
}

try {
  const result = await setupDriveWebhook(fileId, webhookUrl, channelId);
  console.log('Webhook setup successful:');
  console.log(`Channel ID: ${result.channelId}`);
  console.log(`Resource ID: ${result.resourceId}`);
  console.log(`Expiration: ${result.expiration ? new Date(parseInt(result.expiration)).toISOString() : 'N/A'}`);
} catch (error) {
  console.error('Failed to setup webhook:', error);
  process.exit(1);
}
