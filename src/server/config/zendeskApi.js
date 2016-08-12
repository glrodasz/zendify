import env from 'node-env-file';
import Zendesk from 'zendesk-node-api';

// Try first to catch the enviroments from the .env file
try { env('./.env'); } catch (error) { console.error(error); }

const zendeskApi = new Zendesk({
  url: `https://${process.env.ZENDESK_HOST}.zendesk.com`,
  email: process.env.ZENDESK_USERNAME,
  token: process.env.ZENDESK_TOKEN,
});

export default zendeskApi;
