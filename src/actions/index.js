import fetch from 'isomorphic-fetch';
import checkStatus from '../utils/checkStatus';

export const SUBMIT_REQUEST = 'SUBMIT_REQUEST';
export const submitRequest = () => ({ type: SUBMIT_REQUEST });

export const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS';
export const submitSuccess = response => ({
  type: SUBMIT_SUCCESS,
  response,
});

export const SUBMIT_FAILURE = 'SUBMIT_FAILURE';
export const submitFailure = error => ({ type: SUBMIT_FAILURE, error });

export const submitTicket = data => dispatch => {
  dispatch(submitRequest());

  const body = JSON.stringify(data);

  return fetch('/submit', { method: 'post', body })
    .then(checkStatus)
    .then(response => response.json())
    .then(json => dispatch(submitSuccess(json.message)))
    .catch(error => dispatch(submitFailure(`${error.message}.`)));
};
