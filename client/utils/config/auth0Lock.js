/* global __AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__ */
import Auth0Lock from 'auth0-lock';

const auth0Lock = new Auth0Lock(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__, {});

export default auth0Lock;
