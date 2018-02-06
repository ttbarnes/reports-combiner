import {
  PROMISE_EXCHANGE_LOADING,
  PROMISE_EXCHANGE_SUCCESS,
  PROMISE_EXCHANGE_ERROR,
  TOGGLE_SUBSCRIPTION_MODAL
} from '../constants';

const initialState = {
  exchangePromise: {
    exchange: '',
    isLoading: false,
    isSuccess: false,
    hasError: false
  },
  showSubscriptionModal: false
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
    case TOGGLE_SUBSCRIPTION_MODAL:
      return {
        ...state,
        showSubscriptionModal: action.payload
      }
    default:
      return state;
  }
};

export default uiStateReducer;
