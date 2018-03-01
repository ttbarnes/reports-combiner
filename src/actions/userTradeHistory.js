import axios from 'axios';
import {
  API_ROOT,
  API_TRADE_HISTORY,
  API_TRADE_HISTORY_NOTE,
  FETCH_TRADE_HISTORY_SUCCESS,
  FETCH_TRADE_HISTORY_DOWNLOAD_URL_SUCCESS,
  TRADE_HISTORY_ACTIVE_EXCHANGE,
  TRADE_HISTORY_ADD_NOTE_SUCCESS,
  TRADE_HISTORY_ACTIVE_EXCHANGE_RESET,
  TRADE_HISTORY_SET_SORT_BY,
  TRADE_HISTORY_SET_FILTER_BY,
  TRADE_HISTORY_FILTER_BY_SORT_BY_RESET,
  API_TRADE_HISTORY_DOWNLOAD_URL
} from '../constants';
import {
  promiseSidebarLoading,
  promiseSidebarSuccess,
  promiseSidebarError
} from './sidebar';
import {
  userSubscriptionCheck,
  promiseError,
  promiseLoading,
  promiseSuccess
} from './user';

export function tradeHistoryActiveTrade(payload) {
  return {
    type: TRADE_HISTORY_ACTIVE_EXCHANGE,
    payload
  }
}

export function tradeHistoryActiveTradeReset() {
  return {
    type: TRADE_HISTORY_ACTIVE_EXCHANGE_RESET
  }
}

function tradeHistoryAddNoteSuccess(payload) {
  return {
    type: TRADE_HISTORY_ADD_NOTE_SUCCESS,
    payload
  }
}

export function tradeHistorySetSortBy(payload) {
  return  {
    type: TRADE_HISTORY_SET_SORT_BY,
    payload
  }
}

export function tradeHistorySetFilterBy(payload) {
  return {
    type: TRADE_HISTORY_SET_FILTER_BY,
    payload
  }
}

export function tradeHistoryFilterBySortByReset() {
  return {
    type: TRADE_HISTORY_FILTER_BY_SORT_BY_RESET
  }
}

export function fetchUserTradeHistorySuccess(payload) {
  return {
    type: FETCH_TRADE_HISTORY_SUCCESS,
    payload
  }
}

export function fetchUserTradeHistoryDownloadUrlSuccess(payload) {
  return {
    type: FETCH_TRADE_HISTORY_DOWNLOAD_URL_SUCCESS,
    payload
  }
}

export const postTradeHistoryFormNote = () => {
  return (dispatch, getState) => {

    dispatch(promiseSidebarLoading());

    const state = getState();
    const userId = state.user.profile._id;
    const newNote = state.form.FORM_TRADE_HISTORY_ADD_NOTE.values.note;
    const postObj = {
      note: newNote,
      rowId: state.userTradeHistory.activeTrade._id,
      userId
    };

    return axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }).put(
      `${API_ROOT}/user/${API_TRADE_HISTORY_NOTE}`,
      postObj
    ).then((res) => {
      dispatch(promiseSidebarSuccess());
      dispatch(tradeHistoryAddNoteSuccess(res.data.trades));

      // TODO: refactor
      dispatch(tradeHistoryActiveTrade({
        ...state.userTradeHistory.activeTrade,
        note: newNote
      }));
    }, (err) => {
      dispatch(promiseSidebarError(err));
    });
 
  };
};

export const getTradeHistory = () => {
  return (dispatch, getState) => {
    dispatch(promiseError({ hasError: false }));
    dispatch(promiseLoading({ isLoading: true }));
    let userId, user;
    const userObj = () => getState().user.profile;
    user = userObj();
    userId = user._id;

    return axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }).get(
      `${API_ROOT}/user/${userId}/${API_TRADE_HISTORY}`
    ).then((res) => {
      dispatch(fetchUserTradeHistorySuccess(res.data));
      dispatch(promiseLoading({ isLoading: false }));
      dispatch(promiseSuccess({ isLoading: false, isSuccess: true }));
    }, (err) => {
      dispatch(promiseError({ hasError: err.response.data.errorMessage }));
    });
  };
};

export const getTradeHistoryDownloadUrl = () => {
  return (dispatch, getState) => {
    
    const userProfile = getState().user.profile;
    userSubscriptionCheck(dispatch, userProfile, 'downloadHistory').then(() => {

      dispatch(promiseError({ hasError: false }));
      dispatch(promiseLoading({ isLoading: true }));

      return axios.create({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }).get(
        API_TRADE_HISTORY_DOWNLOAD_URL
      ).then((res) => {
        dispatch(fetchUserTradeHistoryDownloadUrlSuccess(res.data.link));
        dispatch(promiseLoading({ isLoading: false }));
        dispatch(promiseSuccess({ isLoading: false, isSuccess: true }));
      }, (err) => {
        dispatch(promiseError({ hasError: err.response.data.errorMessage }));
      });

    }, (err) => {
      dispatch(promiseError({
        hasError: true
      }));
    });
  }
};
