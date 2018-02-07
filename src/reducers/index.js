import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './user';
import uiStateReducer from './uiState';
import sidebarReducer from './sidebar';

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  uiState: uiStateReducer,
  sidebar: sidebarReducer
})

export default rootReducer;
