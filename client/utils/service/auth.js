import { isTokenExpired } from '../tokenHelper';

class AuthService {
  constructor(auth0Lock) {
    this.lock = auth0Lock;
    this.login = this.login.bind(this);
    this.lock.on('authenticated', this.doAuthentication.bind(this));
  }

  // TODO: Refactor
  doAuthentication(authResult) {
    this.setToken(authResult.idToken);
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error); // eslint-disable-line
      } else {
        this.setProfile(profile);
      }
    });
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
