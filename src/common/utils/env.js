import dotenv from 'dotenv';

try { dotenv.load(); } catch (error) { console.error(error); }

export const PRODUCTION = process.env.NODE_ENV === 'production';

export const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
export const AUTH0_CLIENT_DOMAIN = process.env.AUTH0_CLIENT_DOMAIN;

export const ZENDESK_SUBDOMAIN = process.env.ZENDESK_SUBDOMAIN;
export const ZENDESK_USERNAME = process.env.ZENDESK_USERNAME;
export const ZENDESK_TOKEN = process.env.ZENDESK_TOKEN;
