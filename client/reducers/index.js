import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import ticket from './ticket';
import form from './form';
import auth from './auth';

const rootReducer = combineReducers({
  routing,
  auth,
  form,
  ticket,
});

export default rootReducer;
