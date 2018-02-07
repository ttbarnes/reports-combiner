import axios from 'axios';
import {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR
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
