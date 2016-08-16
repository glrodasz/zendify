import dotenv from 'dotenv';

try { dotenv.load(); } catch (error) { console.error(error); } // eslint-disable-line

export const ZENDESK_SUBDOMAIN = process.env.ZENDESK_SUBDOMAIN;
export const ZENDESK_USERNAME = process.env.ZENDESK_USERNAME;
export const ZENDESK_TOKEN = process.env.ZENDESK_TOKEN;
