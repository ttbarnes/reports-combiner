import axios from 'axios';
import {
  API_USER_EXCHANGE_KEYS,
  PROMISE_EXCHANGE_LOADING,
  PROMISE_EXCHANGE_SUCCESS,
  PROMISE_EXCHANGE_ERROR,
  PROMISE_EXCHANGE_RESET,
  SHOW_SUBSCRIPTION_MODAL,
  HIDE_SUBSCRIPTION_MODAL
} from '../constants';

import {
  userSubscriptionCheck,
  userUpdateSuccess
} from './user';

export function promiseExchangeLoading(payload) {
  return {
    type: PROMISE_EXCHANGE_LOADING,
    payload
  }
}

export function promiseExchangeSuccess(payload) {
  return {
    type: PROMISE_EXCHANGE_SUCCESS,
    payload
  }
}

export function promiseExchangeError(payload) {
  return {
    type: PROMISE_EXCHANGE_ERROR,
    payload
  }
}

export function promiseExchangeReset() {
  return {
    type: PROMISE_EXCHANGE_RESET
  }
}

export const postExchangeData = (postObj) => {
  return (dispatch, getState) => {
    const userProfile = getState().user.profile;
    userSubscriptionCheck(dispatch, userProfile, 'addExchange').then(() => {
      dispatch(promiseExchangeError({
        hasError: false,
        exchangeName: postObj.name
      }));
      dispatch(promiseExchangeLoading({
        isLoading: true,
        exchangeName: postObj.name
      }));
      postObj.userId = userProfile._id;
      return axios.create({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }).put(
          API_USER_EXCHANGE_KEYS,
          postObj
        ).then((data) => {
          dispatch(promiseExchangeLoading({
            isLoading: false,
            exchangeName: postObj.name
          }));
          dispatch(promiseExchangeSuccess({
            isLoading: false,
            isSuccess: true,
            exchangeName: postObj.name
          }));
          dispatch(userUpdateSuccess(data.data));
        }, (err) => {
          // errMessage allows for different error structures from backend
          const errMessage = (err.response.data && err.response.data.errorMessage) ? err.response.data.errorMessage : err.response.data;
          dispatch(promiseExchangeLoading({
            isLoading: false,
            exchangeName: postObj.name
          }));
          dispatch(promiseExchangeError({
            hasError: errMessage,
            exchangeName: postObj.name
          }));
        });
    }, (err) => {
      dispatch(promiseExchangeError({
        hasError: false,
        exchangeName: postObj.name
      }));
    });
  };
}

export function showSubSubscriptionModal(payload) {
  return {
    type: SHOW_SUBSCRIPTION_MODAL,
    payload
  }
}

export function hideSubSubscriptionModal(payload) {
  return {
    type: HIDE_SUBSCRIPTION_MODAL
  }
}
