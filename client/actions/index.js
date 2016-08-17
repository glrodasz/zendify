import fetch from 'isomorphic-fetch';
import checkStatus from '../utils/checkStatus';
import { PROMISE_TIMEOUT } from '../utils/constants';
import auth0Lock from '../utils/config/auth0Lock';
import AuthService from '../utils/service/auth';

// Login actions
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

const loginSuccess = profile => ({ type: LOGIN_SUCCESS, profile });
const loginFailure = error => ({ type: LOGIN_FAILURE, error });

export const login = () => dispatch => {
  const successCb = profile => { dispatch(loginSuccess(profile)); };
  const failureCb = error => { dispatch(loginFailure(error)); };
  const authService = new AuthService(auth0Lock, successCb, failureCb);
  authService.login();

  /*
  auth0Lock.show((error, profile, token) => {
    if (error) {
      return dispatch(loginFailure(error));
    }

    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('id_token', token);

    return dispatch(loginSuccess(profile));
  });
  */
};

// Logout actions
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });

export const logout = () => dispatch => {
  const authService = new AuthService(auth0Lock);
  authService.logout();
  return dispatch(logoutSuccess());
};

// Form actions
export const FORM_SUCCESS = 'FORM_SUCCESS';
export const FORM_RESET = 'FORM_RESET';

const formSuccess = () => ({ type: FORM_SUCCESS });

export const reset = () => ({ type: FORM_RESET });


// Submit actions
export const SUBMIT_REQUEST = 'SUBMIT_REQUEST';
export const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS';
export const SUBMIT_FAILURE = 'SUBMIT_FAILURE';

const submitRequest = () => ({ type: SUBMIT_REQUEST });
const submitSuccess = response => ({ type: SUBMIT_SUCCESS, response });
const submitFailure = error => ({ type: SUBMIT_FAILURE, error });

export const submit = data => dispatch => {
  dispatch(submitRequest());

  const body = JSON.stringify(data);

  // Handle the timeout of the promise
  const request = Promise.race([
    fetch('/submit', { method: 'post', body }),
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), PROMISE_TIMEOUT);
    }),
  ]);

  return request
    .then(checkStatus)
    .then(response => response.json())
    .then(json => {
      dispatch(submitSuccess(json.message));
      dispatch(formSuccess());
    })
    .catch(error => dispatch(submitFailure(`${error.message}.`)));
};
