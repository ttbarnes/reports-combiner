import {
  PROMISE_EXCHANGE_LOADING,
  PROMISE_EXCHANGE_SUCCESS,
  PROMISE_EXCHANGE_ERROR
} from '../constants';

const initialState = {
  exchangePromise: {
    exchange: '',
    isLoading: false,
    isSuccess: false,
    hasError: false
  }
};

const uiStateReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case PROMISE_EXCHANGE_LOADING:
      return {
        ...state,
        exchangePromise: {
          ...state.exchangePromise,
          exchange: action.payload.exchange,
          isLoading: action.payload.isLoading
        }
      }
    case PROMISE_EXCHANGE_SUCCESS:
      return {
        ...state,
        exchangePromise: {
          ...state.exchangePromise,
          isLoading: false,
          exchange: action.payload.exchange,
          isSuccess: action.payload.isSuccess
        }
      }
    case PROMISE_EXCHANGE_ERROR:
      return {
        ...state,
        exchangePromise: {
          ...state.exchangePromise,
          isLoading: false,
          exchange: action.payload.exchange,
          hasError: action.payload.hasError
        }
      }
    default:
      return state;
  }
};

export default uiStateReducer;
