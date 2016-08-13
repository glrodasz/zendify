class AuthService {
  constructor(auth0Lock) {
    this.lock = auth0Lock;
    this.login = this.login.bind(this);
    this.lock.on('authenticated', this.doAuthentication.bind(this));
  }

  doAuthentication(authResult) {
    this.setToken(authResult.idToken);
  }

  login() {
    this.lock.show();
  }

  loggedIn() {
    return !!this.getToken();
  }

  setToken(idToken) {
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  logout() {
    localStorage.removeItem('id_token');
  }
}

export default AuthService;
