import fetch from 'isomorphic-fetch';
import checkStatus from '../utils/checkStatus';

export const FULFILL_FORM = 'FULFILL_FORM';
export const RESET_FORM = 'RESET_FORM';

export const fulfillForm = () => ({ type: FULFILL_FORM });
export const resetForm = () => ({ type: RESET_FORM });

export const SUBMIT_REQUEST = 'SUBMIT_REQUEST';
export const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS';
export const SUBMIT_FAILURE = 'SUBMIT_FAILURE';

export const submitRequest = () => ({ type: SUBMIT_REQUEST });

export const submitSuccess = response => ({
  type: SUBMIT_SUCCESS,
  response,
});

export const submitFailure = error => ({ type: SUBMIT_FAILURE, error });

export const submitTicket = data => dispatch => {
  dispatch(submitRequest());

  const body = JSON.stringify(data);

  const promise = Promise.race([
    fetch('/submit', { method: 'post', body }),
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 60000);
    }),
  ]);

  return promise
    .then(checkStatus)
    .then(response => response.json())
    .then(json => {
      dispatch(submitSuccess(json.message));
      dispatch(fulfillForm());
    })
    .catch(error => dispatch(submitFailure(`${error.message}.`)));
};
