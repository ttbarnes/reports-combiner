import axios from 'axios';
import {
  API_ROOT,
  USER_SET_AUTH,
  USER_SIGNUP_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
  DESTORY_USER_SIGNUP_SUCCESS,
  USER_AUTH_ERROR,
  USER_DATA_SUCCESS,
  USER_DATA_ERROR,
  PROMISE_SUCCESS,
  PROMISE_LOADING,
  PROMISE_ERROR,
  SUBSCRIPTION_PREMIUM
} from '../constants';
import { shouldShowSubscribe } from '../utils';
import { showSubSubscriptionModal, hideSubSubscriptionModal } from './uiState';

export function promiseLoading(payload) {
  return {
    type: PROMISE_LOADING,
    payload
  }
}

export function promiseSuccess(payload) {
  return {
    type: PROMISE_SUCCESS,
    payload
  }
}

export function promiseError(payload) {
  return {
    type: PROMISE_ERROR,
    payload
  }
}

export function signupSuccess() {
  return {
    type: USER_SIGNUP_SUCCESS
  }
}

export function setUserAuth(payload) {
  return {
    type: USER_SET_AUTH,
    payload
  }
}

export function loginSuccess() {
  return {
    type: USER_LOGIN_SUCCESS
  }
}

export function logoutSuccess() {
  return {
    type: USER_LOGOUT_SUCCESS
  }
}

export function userUpdateSuccess(payload) {
  return {
    type: USER_UPDATE_SUCCESS,
    payload
  }
}

export function updateError() {
  return {
    type: USER_UPDATE_ERROR
  }
}


export function authError(err) {
  return {
    type: USER_AUTH_ERROR,
    payload: err
  }
}

export function destroyUserSignupSuccess() {
  return {
    type: DESTORY_USER_SIGNUP_SUCCESS,
    payload: false
  }
}

export function userDataSuccess(payload) {
  return {
    type: USER_DATA_SUCCESS,
    payload
  }
}

export function userDataError() {
  return {
    type: USER_DATA_ERROR
  }
}

export const authCheck = () => {
  return (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined') {
      // TODO: api check token
      getUserData(dispatch);
      dispatch(setUserAuth(true));
    } else {
      // not auth
      dispatch(setUserAuth(false));
    }
  };
}

export const userSignup = () => {
  return (dispatch, getState) => {
    const userObj = () => {
      if (getState().form &&
        getState().form.FORM_USER_LOGIN_SIGNUP &&
        getState().form.FORM_USER_LOGIN_SIGNUP.values) {
        return JSON.stringify(getState().form.FORM_USER_LOGIN_SIGNUP.values)
      } else {
        return null;
      }
    }
    return axios.create({
      headers: {
        'Content-Type': 'application/json'
      }
    }).post(
      `${API_ROOT}/user`,
      userObj()
      ).then((data) => {
        if (data && data.data.success === true) {
          dispatch(signupSuccess())
          dispatch(userLogin())
        } else {
          dispatch(authError('Something is wrong'));
        }
      }, () => {
        dispatch(authError('Something is wrong'));
      });
  }
}

export const getUserData = (dispatch) => {
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
  }).post(
    `${API_ROOT}/auth`
    ).then((res) => {
      if (res.data && res.data.success === true) {
        dispatch(userDataSuccess(res.data.resUserObj));
      } else {
        dispatch(userDataError());
        dispatch(logout());
      }
    }, () => {
      dispatch(userDataError());
      dispatch(logout());
    });
}

export const userLogin = () => {
  return (dispatch, getState) => {
    dispatch(setUserAuth(false));
    dispatch(authError(''));
    const userObj = () => {
      if (getState().form &&
        getState().form.FORM_USER_LOGIN_SIGNUP &&
        getState().form.FORM_USER_LOGIN_SIGNUP.values) {
        return JSON.stringify(getState().form.FORM_USER_LOGIN_SIGNUP.values)
      } else {
        return null;
      }
    }
    return axios.create({
      headers: {
        'Content-Type': 'application/json'
      }
    }).post(
      `${API_ROOT}/auth/login`,
      userObj()
      ).then((data) => {
        if (data && data.data.success === true) {
          localStorage.setItem('token', data.data.token);
          dispatch(setUserAuth(true));
          dispatch(loginSuccess()); // TODO: observables login success
          getUserData(dispatch);
        } else {
          localStorage.removeItem('token');
          dispatch(authError('Something is wrong'));
        }
      }, () => {
        dispatch(authError('Something is wrong'));
      });
  }
}

export const userUpdate = () => {
  return (dispatch, getState) => {
    dispatch(promiseError({ hasError: false }));
    dispatch(promiseLoading({ isLoading: true }));
    let userId, user;
    const userObj = () => getState().user.profile;
    user = userObj();
    user.subscription = SUBSCRIPTION_PREMIUM;
    userId = user._id;
    return axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }).put(
      `${API_ROOT}/user/${userId}`,
      user
      ).then((data) => {
        if (data && data.data) {
          dispatch(promiseSuccess({ isLoading: false, isSuccess: true }));
          dispatch(userUpdateSuccess(data.data));
          setTimeout(() => {
            dispatch(hideSubSubscriptionModal());
          }, 5000);
        } else {
          dispatch(promiseError({ hasError: true }));
        }
      }, () => {
        dispatch(promiseError({ hasError: true }));
      });
  }
}

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch(setUserAuth(false));
  }
}

export const userSubscriptionCheck = (dispatch, profile, context) => {
  return new Promise((resolve, reject) => {
    if (shouldShowSubscribe(profile, context)) {
      dispatch(showSubSubscriptionModal(context));
      return reject('Subscription required.');
    } else {
      return resolve();
    }
  });
}
