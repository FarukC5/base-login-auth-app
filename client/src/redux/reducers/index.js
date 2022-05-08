import { combineReducers } from 'redux';
import { userAuthReducer } from './authReducers';
import { errorsReducers } from './errorReducers';

const reducers = combineReducers({
  auth: userAuthReducer,
  errors: errorsReducers
});

export default reducers;