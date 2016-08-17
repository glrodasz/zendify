import { FORM_SUCCESS, FORM_RESET } from '../actions';

function form(state = { isFulfilled: false }, action) {
  switch (action.type) {
    case FORM_SUCCESS:
      return {
        ...state,
        isFulfilled: true,
      };
    case FORM_RESET:
      return {
        ...state,
        isFulfilled: false,
      };
    default:
      return state;
  }
}

export default form;
