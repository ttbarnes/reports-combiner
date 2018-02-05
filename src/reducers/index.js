import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './user';
import uiStateReducer from './uiState';

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  uiState: uiStateReducer
})

export default rootReducer;
