import { isTokenExpired } from '../tokenHelper';
import noop from '../../../src/common/utils/noop';

class AuthService {
  constructor(auth0Lock, successCb = noop, failureCb = noop) {
    this.lock = auth0Lock;

    this.successCb = successCb;
    this.failureCb = failureCb;

    this.login = this.login.bind(this);
    this.lock.on('authenticated', this.authenticated.bind(this));
    this.lock.on('authorization_error', this.authorizationError.bind(this));
  }

  authenticated(authResult) {
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.error('Error loading the profile', error); // eslint-disable-line
      } else {
        this.setToken(authResult.idToken);
        this.setProfile(profile);
        this.successCb(profile);
      }
    });
  }

  authorizationError(error) {
    console.error('Authentication Error', error);  // eslint-disable-line
    this.failureCb(error);
  }

  login() {
    this.lock.show();
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !isTokenExpired(token);
  }

  setProfile(profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  getProfile() {
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : {};
  }

  setToken(idToken) {
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }
}

export default AuthService;
