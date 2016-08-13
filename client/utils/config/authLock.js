import Auth0Lock from 'auth0-lock';
import {
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_DOMAIN,
} from '../../../src/common/utils/env';

const auth0Lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_CLIENT_DOMAIN, {});

export default auth0Lock;
