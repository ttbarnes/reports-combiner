import axios from 'axios';
import {
  API_ROOT,
  USER_SET_AUTH,
  USER_SIGNUP_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  DESTORY_USER_SIGNUP_SUCCESS,
  USER_AUTH_ERROR,
  USER_DATA_SUCCESS,
  USER_DATA_ERROR
} from '../constants';

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
        getState().form.USER_SIGN_UP &&
        getState().form.USER_SIGN_UP.values) {
        return JSON.stringify(getState().form.USER_SIGN_UP.values)
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
        getState().form.USER_LOGIN &&
        getState().form.USER_LOGIN.values) {
        return JSON.stringify(getState().form.USER_LOGIN.values)
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

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch(setUserAuth(false));
  }
}
