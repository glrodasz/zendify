import { combineReducers } from 'redux';
import ticket from './ticket';
import form from './form';

const rootReducer = combineReducers({
  ticket,
  form,
});

export default rootReducer;
