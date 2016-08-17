import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
} from '../actions';
import { isTokenExpired } from '../utils/jwtHelper';

// TODO: Move into AuthService
const token = localStorage.getItem('id_token');

// TODO: Move into AuthService
function getProfile() {
  return JSON.parse(localStorage.getItem('profile'));
}

function auth(state = {
  isAuthenticated: isTokenExpired(token),
  profile: getProfile(),
  error: '',
}, action) {
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
        profile: null,
        error: action.error,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        profile: null,
      };
    default:
      return state;
  }
}

export default auth;
