import axios from 'axios';
import {
  API_ROOT,
  API_TRADE_HISTORY_NOTE,
  TRADE_HISTORY_ACTIVE_ROW,
  TRADE_HISTORY_ADD_NOTE_SUCCESS
} from '../constants';
import {
  promiseSidebarLoading,
  promiseSidebarSuccess,
  promiseSidebarError
} from './sidebar';

export function tradeHistoryActiveRow(payload) {
  return {
    type: TRADE_HISTORY_ACTIVE_ROW,
    payload
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
    const newNote = state.form.TRADE_HISTORY_ADD_NOTE.values.note;
    const postObj = {
      note: newNote,
      rowId: state.userTradeHistory.activeRow._id,
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
    }, (err) => {
      dispatch(promiseSidebarError(err));
    });
 
  };
};
