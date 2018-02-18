import {
  FETCH_TRADE_HISTORY_SUCCESS,
  TRADE_HISTORY_ACTIVE_ROW,
  TRADE_HISTORY_ADD_NOTE_SUCCESS
} from '../constants';

const initialState = {
  data: [],
  filteredData: [],
  activeRow: null
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
    case TRADE_HISTORY_ACTIVE_ROW:
      return {
        ...state,
        activeRow: action.payload
      }
    case TRADE_HISTORY_ADD_NOTE_SUCCESS:
      return Object.assign({}, state, {
        data: {
          ...state.data,
          trades: action.payload
        }
      });
    default:
      return state;
  }
};

export default userTradeHistoryReducer;
