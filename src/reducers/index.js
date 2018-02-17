import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './user';
import uiStateReducer from './uiState';
import sidebarReducer from './sidebar';
import userTradeHistoryReducer from './userTradeHistory';

const rootReducer = combineReducers({
  form: formReducer,
  sidebar: sidebarReducer,
  uiState: uiStateReducer,
  user: userReducer,
  userTradeHistory: userTradeHistoryReducer
})

export default rootReducer;
