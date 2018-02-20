import axios from 'axios';
import {
  API_ROOT,
  API_TRADE_HISTORY_NOTE,
  TRADE_HISTORY_ACTIVE_EXCHANGE,
  TRADE_HISTORY_ADD_NOTE_SUCCESS,
  TRADE_HISTORY_ACTIVE_EXCHANGE_RESET
} from '../constants';
import {
  promiseSidebarLoading,
  promiseSidebarSuccess,
  promiseSidebarError
} from './sidebar';

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
