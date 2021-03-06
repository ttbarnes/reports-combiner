/*
* global
*/
export const API_ROOT = 'http://localhost:8080/api';
export const MAX_FREE_KEYS = 2;
export const API_USER_EXCHANGE_KEYS = `${API_ROOT}/user/exchange-keys`;
export const API_TRADE_HISTORY = 'trade-history';
export const API_TRADE_HISTORY_NOTE = `${API_TRADE_HISTORY}/note`;
export const API_TRADE_HISTORY_DOWNLOAD_URL = `${API_ROOT}/poc/master-history/local/download`;

export const SUBSCRIPTION_PREMIUM = 'premium';
export const EXCHANGES_MAP = [
  { name: 'Binance' },
  { name: 'Bitfinex' },
  { name: 'GDAX', requiresPassphrase: true },
  { name: 'Cryptopia' }
];

/*
* history table
*/
export const HISTORY_TABLE_FIELDS_DISALLOWED = ['_id'];
export const FILTERS_ALLOWED_FIELDS = [
  'timestamp',
  'amount',
  'fee',
  'type',
  'exchange'
];
export const FILTERS_TRADE_TYPE_VALUES = ['Buy', 'Sell'];

export const FILTERS_TRADE_TYPE_ASCENDING = 'tradeTypeAscending';
export const FILTERS_TRADE_TYPE_DESCENDING = 'tradeTypeDescending';

export const FILTERS_EXCHANGE_NAME_ASCENDING = 'exchangeNameAscending';
export const FILTERS_EXCHANGE_NAME_DESCENDING = 'exchangeNameDescending';

export const FILTERS_AMOUNT_ASCENDING = 'amountAscending';
export const FILTERS_AMOUNT_DESCENDING = 'amountDescending';

export const FILTERS_TIMESTAMP_ASCENDING = 'timestampAscending';
export const FILTERS_TIMESTAMP_DESCENDING = 'timestampDescending';

export const FILTERS_FEE_ASCENDING = 'feeAscending';
export const FILTERS_FEE_DESCENDING = 'feeDescending';


/*
* form names
*/
export const FORM_USER_LOGIN_SIGNUP = 'FORM_USER_LOGIN_SIGNUP';
export const FORM_TRADE_HISTORY_ADD_NOTE = 'FORM_TRADE_HISTORY_ADD_NOTE';


/*
* actions
*/
export const USER_SET_AUTH = 'USER_SET_AUTH';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const DESTORY_USER_SIGNUP_SUCCESS = 'DESTORY_USER_SIGNUP_SUCCESS';

// user auth/profile
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_AUTH_ERROR = 'USER_AUTH_ERROR';
export const USER_DATA_SUCCESS = 'USER_DATA_SUCCESS';
export const USER_DATA_ERROR = 'USER_DATA_ERROR';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_ERROR = 'USER_UPDATE_ERROR';

// promises
export const PROMISE_LOADING = 'PROMISE_LOADING';
export const PROMISE_SUCCESS = 'PROMISE_SUCCESS';
export const PROMISE_ERROR = 'PROMISE_ERROR';

// exchange promises
export const PROMISE_EXCHANGE_LOADING = 'PROMISE_EXCHANGE_LOADING';
export const PROMISE_EXCHANGE_SUCCESS = 'PROMISE_EXCHANGE_SUCCESS';
export const PROMISE_EXCHANGE_ERROR = 'PROMISE_EXCHANGE_ERROR';
export const PROMISE_EXCHANGE_RESET = 'PROMISE_EXCHANGE_RESET';

// subscription modal
export const SHOW_SUBSCRIPTION_MODAL = 'SHOW_SUBSCRIPTION_MODAL';
export const HIDE_SUBSCRIPTION_MODAL = 'HIDE_SUBSCRIPTION_MODAL';

// sidebar
export const OPEN_SIDEBAR = 'OPEN_SIDEBAR';
export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';
export const PROMISE_SIDEBAR_LOADING = 'PROMISE_SIDEBAR_LOADING';
export const PROMISE_SIDEBAR_SUCCESS = 'PROMISE_SIDEBAR_SUCCESS';
export const PROMISE_SIDEBAR_ERROR = 'PROMISE_SIDEBAR_ERROR';
export const PROMISE_SIDEBAR_RESET = 'PROMISE_SIDEBAR_RESET';

// sidebar - trade history specifics
export const SIDEBAR_TRADE_HISTORY_ADD_NOTE = 'SIDEBAR_TRADE_HISTORY_ADD_NOTE';
export const SIDEBAR_TRADE_HISTORY = 'SIDEBAR_TRADE_HISTORY';


// trade history
export const FETCH_TRADE_HISTORY_SUCCESS = 'FETCH_TRADE_HISTORY_SUCCESS';
export const FETCH_TRADE_HISTORY_DOWNLOAD_URL_SUCCESS = 'FETCH_TRADE_HISTORY_DOWNLOAD_URL_SUCCESS';
export const TRADE_HISTORY_ACTIVE_EXCHANGE = 'TRADE_HISTORY_ACTIVE_EXCHANGE';
export const TRADE_HISTORY_ACTIVE_EXCHANGE_RESET = 'TRADE_HISTORY_ACTIVE_EXCHANGE_RESET';
export const TRADE_HISTORY_ADD_NOTE_SUCCESS = 'TRADE_HISTORY_ADD_NOTE_SUCCESS';
export const TRADE_HISTORY_RESET = 'TRADE_HISTORY_RESET';


// trade history filters/sorting
export const TRADE_HISTORY_SET_SORT_BY = 'TRADE_HISTORY_SET_SORT_BY';
export const TRADE_HISTORY_SET_FILTER_BY = 'TRADE_HISTORY_SET_FILTER_BY';
export const TRADE_HISTORY_FILTER_BY_SORT_BY_RESET = 'TRADE_HISTORY_FILTER_BY_SORT_BY_RESET';
