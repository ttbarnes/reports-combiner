import {
  USER_SET_AUTH,
  USER_SIGNUP_SUCCESS,
  DESTORY_USER_SIGNUP_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_AUTH_ERROR,
  USER_DATA_SUCCESS,
  USER_DATA_ERROR,
  USER_UPDATE_SUCCESS,
  PROMISE_LOADING,
  PROMISE_SUCCESS,
  PROMISE_ERROR
} from '../constants';

const initialState = {
  isAuth: false,
  signupSuccess: false,
  authError: null,
  profile: {},
  promise: {
    isLoading: false,
    isSuccess: false,
    hasError: false
  }
};

const userReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case USER_SET_AUTH:
      return {
        ...state,
        isAuth: action.payload
      }
    case USER_AUTH_ERROR:
      return {
        ...state,
        authError: action.payload
      }
    case USER_SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        signupSuccess: true
      });
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        authError: false,
        isAuth: true,
        signupSuccess: true
      }
    case DESTORY_USER_SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        signupSuccess: false
      });
    case USER_DATA_SUCCESS:
      return {
        ...state,
        profile: action.payload
      }
    case USER_DATA_ERROR:
      return {
        ...state,
        profile: false
      }
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        profile: action.payload
      }
    case PROMISE_LOADING:
      return {
        ...state,
        promise: {
          ...state.promise,
          isLoading: action.payload.isLoading
        }
      }
    case PROMISE_SUCCESS:
      return {
        ...state,
        promise: {
          ...state.promise,
          isLoading: false,
          isSuccess: action.payload.isSuccess
        }
      }
    case PROMISE_ERROR:
      return {
        ...state,
        promise: {
          ...state.promise,
          isLoading: false,
          hasError: action.payload.hasError
        }
      }
    default:
      return state;
  }
};

export default userReducer;
