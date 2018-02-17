import {
  FETCH_TRADE_HISTORY_SUCCESS
} from '../constants';

const initialState = {
  data: [],
  filteredData: []
}

const userTradeHistoryReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case FETCH_TRADE_HISTORY_SUCCESS:
      return Object.assign({}, state, {
        data: action.payload
      });
    default:
      return state;
  }
};

export default userTradeHistoryReducer;
