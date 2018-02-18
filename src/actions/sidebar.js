import {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  PROMISE_SIDEBAR_LOADING,
  PROMISE_SIDEBAR_SUCCESS,
  PROMISE_SIDEBAR_ERROR,
  PROMISE_SIDEBAR_RESET
} from '../constants';

export function openSidebar(payload) {
  return {
    type: OPEN_SIDEBAR,
    payload
  }
}

export function closeSidebar() {
  return { type: CLOSE_SIDEBAR }
}

export function promiseSidebarLoading() {
  return {
    type: PROMISE_SIDEBAR_LOADING
  }
}

export function promiseSidebarSuccess() {
  return {
    type: PROMISE_SIDEBAR_SUCCESS
  }
}

export function promiseSidebarError() {
  return {
    type: PROMISE_SIDEBAR_ERROR
  }
}

export function promiseSidebarReset() {
  return {
    type: PROMISE_SIDEBAR_RESET
  }
}
