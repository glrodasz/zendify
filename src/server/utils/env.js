import dotenv from 'dotenv';

// First we are trying to load the env variables with dontenv.
try { dotenv.load(); } catch (error) { console.error(error); } // eslint-disable-line

export const ZENDESK_SUBDOMAIN = process.env.ZENDESK_SUBDOMAIN;
export const ZENDESK_USERNAME = process.env.ZENDESK_USERNAME;
export const ZENDESK_TOKEN = process.env.ZENDESK_TOKEN;
export const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
export const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
