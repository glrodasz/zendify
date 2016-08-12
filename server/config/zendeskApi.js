import path from 'path';
import env from 'node-env-file';
import Zendesk from 'zendesk-node-api';

env(path.join(__dirname, '.env'));

const zendeskApi = new Zendesk({
  url: `https://${process.env.ZENDESK_HOST}.zendesk.com`,
  email: process.env.ZENDESK_USERNAME,
  token: process.env.ZENDESK_TOKEN,
});

export default zendeskApi;
