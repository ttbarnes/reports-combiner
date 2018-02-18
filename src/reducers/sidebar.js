import {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  PROMISE_SIDEBAR_LOADING,
  PROMISE_SIDEBAR_SUCCESS,
  PROMISE_SIDEBAR_ERROR,
  PROMISE_SIDEBAR_RESET
} from '../constants';

const initialState = {
  active: false,
  context: '',
  promise: {
    isLoading: false,
    isSuccess: false,
    hasError: false
  }
};

const sidebarReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case OPEN_SIDEBAR:
      return {
        ...state,
        active: true,
        context: action.payload
      }
    case CLOSE_SIDEBAR:
      return {
        ...state,
        active: false,
        context: ''
      }
    case PROMISE_SIDEBAR_LOADING:
      return Object.assign({}, state, {
        promise: {
          ...state.promise,
          hasError: false,
          isLoading: true
        }
      });
    case PROMISE_SIDEBAR_SUCCESS:
      return Object.assign({}, state, {
        promise: {
          ...state.promise,
          isLoading: false,
          isSuccess: true
        }
      });
    case PROMISE_SIDEBAR_ERROR:
      return Object.assign({}, state, {
        promise: {
          ...state.promise,
          isLoading: false,
          hasError: true
        }
      });
    case PROMISE_SIDEBAR_RESET:
      return Object.assign({}, state, {
        promise: initialState.promise
      });
    default:
      return state;
  }
};

export default sidebarReducer;
