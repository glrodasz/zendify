import fetch from 'isomorphic-fetch';
import checkStatus from '../utils/checkStatus';

export const SUBMIT_REQUEST = 'SUBMIT_REQUEST';
export const submitRequest = () => ({ type: SUBMIT_REQUEST });

export const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS';
export const submitSuccess = jsonResponse => ({
  type: SUBMIT_SUCCESS,
  jsonResponse,
});

export const SUBMIT_FAILURE = 'SUBMIT_FAILURE';
export const submitFailure = error => ({ type: SUBMIT_FAILURE, error });

export const submitTicket = data => dispatch => {
  dispatch(submitRequest());

  const body = JSON.stringify(data);

  return fetch('https://api.example.com/submit', { method: 'post', body })
    .then(checkStatus)
    .then(response => response.json())
    .then(json => dispatch(submitSuccess(json)))
    .catch(error => dispatch(submitFailure(error)));
};
