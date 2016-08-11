import {
  SUBMIT_REQUEST,
  SUBMIT_FAILURE,
  SUBMIT_SUCCESS,
} from '../actions';

function submitTicket(state = {
  isLoading: false,
  showError: false,
  clearForm: false,
}, action) {
  switch (action.type) {
    case SUBMIT_REQUEST:
      return {
        ...state,
        isLoading: true,
        showError: false,
        clearForm: false,
        errorResponse: '',
        successResponse: '',
      };
    case SUBMIT_FAILURE:
      return {
        ...state,
        isLoading: false,
        showError: true,
        clearForm: false,
        errorResponse: action.error,
      };
    case SUBMIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showError: false,
        clearForm: true,
        successResponse: action.response,
      };
    default:
      return state;
  }
}

export default submitTicket;
