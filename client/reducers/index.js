import { combineReducers } from 'redux';
import ticket from './ticket';
import form from './form';
import auth from './auth';

const rootReducer = combineReducers({
  ticket,
  form,
  auth,
});

export default rootReducer;
