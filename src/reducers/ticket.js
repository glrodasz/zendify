import {
  SUBMIT_REQUEST,
  SUBMIT_FAILURE,
  SUBMIT_SUCCESS,
} from '../actions';

function ticket(state = { isLoading: false, showError: false }, action) {
  switch (action.type) {
    case SUBMIT_REQUEST:
      return {
        ...state,
        isLoading: true,
        showError: false,
        errorResponse: '',
        successResponse: '',
      };
    case SUBMIT_FAILURE:
      return {
        ...state,
        isLoading: false,
        showError: true,
        errorResponse: action.error,
      };
    case SUBMIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showError: false,
        successResponse: action.response,
      };
    default:
      return state;
  }
}

export default ticket;
