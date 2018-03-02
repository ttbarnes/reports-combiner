import {
  FETCH_TRADE_HISTORY_SUCCESS,
  FETCH_TRADE_HISTORY_DOWNLOAD_URL_SUCCESS,
  TRADE_HISTORY_ACTIVE_EXCHANGE,
  TRADE_HISTORY_ACTIVE_EXCHANGE_RESET,
  TRADE_HISTORY_ADD_NOTE_SUCCESS,
  TRADE_HISTORY_SET_SORT_BY,
  TRADE_HISTORY_SET_FILTER_BY,
  TRADE_HISTORY_FILTER_BY_SORT_BY_RESET,
  TRADE_HISTORY_RESET
} from '../constants';

const initialState = {
  data: [],
  activeTrade: null,
  sortBy: null,
  filterBy: {},
  downloadUrl: null
};

const userTradeHistoryReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case FETCH_TRADE_HISTORY_SUCCESS:
      return Object.assign({}, state, {
        data: action.payload
      });
    case FETCH_TRADE_HISTORY_DOWNLOAD_URL_SUCCESS:
      return Object.assign({}, state, {
        downloadUrl: action.payload
      });
    case TRADE_HISTORY_ACTIVE_EXCHANGE:
      return {
        ...state,
        activeTrade: action.payload
      }
    case TRADE_HISTORY_ACTIVE_EXCHANGE_RESET:
      return {
        ...state,
        activeTrade: initialState.activeTrade
      }
    case TRADE_HISTORY_ADD_NOTE_SUCCESS:
      return Object.assign({}, state, {
        data: {
          ...state.data,
          trades: action.payload
        }
      })
    case TRADE_HISTORY_SET_SORT_BY: 
      return Object.assign({}, state, {
        sortBy: action.payload
      });
    case TRADE_HISTORY_SET_FILTER_BY:
      return Object.assign({}, state, {
        filterBy: action.payload
      });
    case TRADE_HISTORY_FILTER_BY_SORT_BY_RESET:
      return {
        ...state,
        sortBy: initialState.sortBy,
        filterBy: initialState.filterBy
      }
    case TRADE_HISTORY_RESET:
      return initialState;
    default:
      return state;
  }
};

export default userTradeHistoryReducer;
