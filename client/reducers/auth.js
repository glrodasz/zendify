import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../actions';
import auth0Lock from '../utils/config/auth0Lock';
import AuthService from '../utils/service/auth';

const authService = new AuthService(auth0Lock);

const initialState = {
  isAuthenticated: authService.loggedIn(),
  profile: authService.getProfile(),
  error: '',
};

function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        profile: action.profile,
        error: '',
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        profile: {},
        error: action.error,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        profile: {},
      };
    default:
      return state;
  }
}

export default auth;
