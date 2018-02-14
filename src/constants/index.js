// global
export const API_ROOT = 'http://localhost:8080/api';
// export const POSSIBLE_EXCHANGES = ['Binance', 'Bitfinex', 'GDAX', 'Cryptopia'];
export const MAX_FREE_KEYS = 2;
export const API_USER_EXCHANGE_KEYS = `${API_ROOT}/user/exchange-keys`;
export const SUBSCRIPTION_PREMIUM = 'premium';
export const EXCHANGES_MAP = [
  { name: 'Binance' },
  { name: 'Bitfinex' },
  { name: 'GDAX', requiresPassphrase: true },
  { name: 'Cryptopia' }
];

// actions
export const USER_SET_AUTH = 'USER_SET_AUTH';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const DESTORY_USER_SIGNUP_SUCCESS = 'DESTORY_USER_SIGNUP_SUCCESS';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_AUTH_ERROR = 'USER_AUTH_ERROR';
export const USER_DATA_SUCCESS = 'USER_DATA_SUCCESS';
export const USER_DATA_ERROR = 'USER_DATA_ERROR';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_ERROR = 'USER_UPDATE_ERROR';
export const FETCH_USER_TRADE_HISTORY_SUCCESS = 'FETCH_USER_TRADE_HISTORY_SUCCESS';

export const PROMISE_LOADING = 'PROMISE_LOADING';
export const PROMISE_SUCCESS = 'PROMISE_SUCCESS';
export const PROMISE_ERROR = 'PROMISE_ERROR';

export const PROMISE_EXCHANGE_LOADING = 'PROMISE_EXCHANGE_LOADING';
export const PROMISE_EXCHANGE_SUCCESS = 'PROMISE_EXCHANGE_SUCCESS';
export const PROMISE_EXCHANGE_ERROR = 'PROMISE_EXCHANGE_ERROR';
export const PROMISE_EXCHANGE_RESET = 'PROMISE_EXCHANGE_RESET';

export const SHOW_SUBSCRIPTION_MODAL = 'SHOW_SUBSCRIPTION_MODAL';
export const HIDE_SUBSCRIPTION_MODAL = 'HIDE_SUBSCRIPTION_MODAL';

export const OPEN_SIDEBAR = 'OPEN_SIDEBAR';
export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';
