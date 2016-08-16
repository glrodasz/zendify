import ZendeskNodeApi from 'zendesk-node-api';
import {
  ZENDESK_SUBDOMAIN,
  ZENDESK_USERNAME,
  ZENDESK_TOKEN,
} from '../utils/env';

const zendeskNodeApi = new ZendeskNodeApi({
  url: `https://${ZENDESK_SUBDOMAIN}.zendesk.com`,
  email: ZENDESK_USERNAME,
  token: ZENDESK_TOKEN,
});

export default zendeskNodeApi;
