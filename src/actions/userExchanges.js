import axios from 'axios';
import {
  API_USER_EXCHANGE_KEYS,
  PROMISE_EXCHANGE_LOADING,
  PROMISE_EXCHANGE_SUCCESS,
  PROMISE_EXCHANGE_ERROR
} from '../constants';

import { userSubscriptionCheck } from './index';

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

export const postExchangeData = (postObj) => {
  return (dispatch, getState) => {
    const userProfile = getState().user.profile;
    userSubscriptionCheck(dispatch, userProfile).then(() => {
      dispatch(promiseExchangeError({
        hasError: false,
        exchange: postObj.exchange
      }));
      dispatch(promiseExchangeLoading({
        isLoading: true,
        exchange: postObj.exchange
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
            exchange: postObj.exchange
          }));
          dispatch(promiseExchangeSuccess({
            isLoading: false,
            isSuccess: true,
            exchange: postObj.exchange
          }));
        }, () => {
          dispatch(promiseExchangeLoading({
            isLoading: false,
            exchange: postObj.exchange
          }));
          dispatch(promiseExchangeError({
            hasError: true,
            exchange: postObj.exchange
          }));
        });
    }, (err) => {
      dispatch(promiseExchangeError({
        hasError: false,
        exchange: postObj.exchange
      }));
    });
  };
}
