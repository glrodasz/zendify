import { FULFILL_FORM, RESET_FORM } from '../actions';

function form(state = { isFulfilled: false }, action) {
  switch (action.type) {
    case FULFILL_FORM:
      return {
        ...state,
        isFulfilled: true,
      };
    case RESET_FORM:
      return {
        ...state,
        isFulfilled: false,
      };
    default:
      return state;
  }
}

export default form;
