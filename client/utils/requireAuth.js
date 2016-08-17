import auth0Lock from '../utils/config/auth0Lock';
import AuthService from '../utils/service/auth';

export const authService = new AuthService(auth0Lock);

const requireAuth = (nextState, replace) => {
  if (!authService.loggedIn()) {
    replace({ pathname: '/' });
  }
};

export default requireAuth;
