import {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR
} from '../constants';

const initialState = {
  active: false,
  context: ''
};

const sidebarReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case OPEN_SIDEBAR:
      return {
        ...state,
        active: true,
        context: action.payload
      }
    case CLOSE_SIDEBAR:
      return {
        ...state,
        active: false,
        context: ''
      }
    default:
      return state;
  }
};

export default sidebarReducer;
