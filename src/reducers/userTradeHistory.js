import {
  FETCH_USER_TRADE_HISTORY_SUCCESS
} from '../constants';

const initialState = [];

const userReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case FETCH_USER_TRADE_HISTORY_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
