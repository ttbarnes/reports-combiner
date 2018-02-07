import {
  PROMISE_EXCHANGE_LOADING,
  PROMISE_EXCHANGE_SUCCESS,
  PROMISE_EXCHANGE_ERROR,
  SHOW_SUBSCRIPTION_MODAL,
  HIDE_SUBSCRIPTION_MODAL,
  PROMISE_EXCHANGE_RESET
} from '../constants';

const initialState = {
  promise: {
    exchangeName: '',
    isLoading: false,
    isSuccess: false,
    hasError: false
  },
  subscriptionModal: {
    show: false,
    fromContext: ''
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
        promise: {
          ...state.promise,
          exchangeName: action.payload.exchangeName,
          isLoading: action.payload.isLoading
        }
      }
    case PROMISE_EXCHANGE_SUCCESS:
      return {
        ...state,
        promise: {
          ...state.promise,
          isLoading: false,
          exchangeName: action.payload.exchangeName,
          isSuccess: action.payload.isSuccess
        }
      }
    case PROMISE_EXCHANGE_ERROR:
      return {
        ...state,
        promise: {
          ...state.promise,
          isLoading: false,
          exchangeName: action.payload.exchangeName,
          hasError: action.payload.hasError
        }
      }
    case PROMISE_EXCHANGE_RESET:
      return {
        ...state,
        promise: {
          isLoading: false,
          exchangeName: '',
          hasError: false
        }
      }
    case SHOW_SUBSCRIPTION_MODAL:
      return {
        ...state,
        subscriptionModal: {
          fromContext: action.payload,
          show: true
        }
      }
    case HIDE_SUBSCRIPTION_MODAL:
      return {
        ...state,
        subscriptionModal: {
          fromContext: '',
          show: false
        }
      }
    default:
      return state;
  }
};

export default uiStateReducer;
