import { createSelector } from 'reselect'
import {
  HISTORY_TABLE_FILTERS_TRADE_TYPE_ALPHABETICAL,
  HISTORY_TABLE_FILTERS_TRADE_TYPE_ALPHABETICAL_REVERSE,
  HISTORY_TABLE_FILTERS_EXCHANGE_NAME_ALPHABETICAL,
  HISTORY_TABLE_FILTERS_EXCHANGE_NAME_ALPHABETICAL_REVERSE
} from '../constants';

const selectTradeHistoryBase = state => state.userTradeHistory;

const selectTradeHistoryData = createSelector(
  selectTradeHistoryBase,
  tradeHistory => tradeHistory.data
);

export const selectTradeHistoryTrades = createSelector(
  selectTradeHistoryData,
  tradeHistory => tradeHistory.trades
);

// export const selectTradeHistoryByDate = createSelector(
//   selectTradeHistoryTrades,
//   trades => trades && trades.length && trades.sort((a: any, b: any): any =>
//     new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
//   )
// );

export const selectTradeHistorySortBy = createSelector(
  selectTradeHistoryBase,
  tradeHistory => tradeHistory.sortBy
);

export const selectTradeHistoryFilterBy = createSelector(
  selectTradeHistoryBase,
  tradeHistory => tradeHistory.filterBy
);

// TODO: clean me
export const sortTrades = (trades, sortBy) => 
  trades && trades.length && trades.sort((a, b) => {
    let fieldName = '';
    if (sortBy === HISTORY_TABLE_FILTERS_TRADE_TYPE_ALPHABETICAL ||
        sortBy === HISTORY_TABLE_FILTERS_TRADE_TYPE_ALPHABETICAL_REVERSE) {
      fieldName = 'tradeType';
    }
    if (sortBy === HISTORY_TABLE_FILTERS_EXCHANGE_NAME_ALPHABETICAL ||
      sortBy === HISTORY_TABLE_FILTERS_EXCHANGE_NAME_ALPHABETICAL_REVERSE) {
      fieldName = 'exchangeName';
    }


    if (sortBy === HISTORY_TABLE_FILTERS_TRADE_TYPE_ALPHABETICAL) {
      if (a[fieldName].toUpperCase() < b[fieldName].toUpperCase()) {
        return -1;
      }
      if (a[fieldName].toUpperCase() > b[fieldName].toUpperCase()) {
        return 1;
      }
      return 0;
    } else if (sortBy === HISTORY_TABLE_FILTERS_TRADE_TYPE_ALPHABETICAL_REVERSE) {
      if (a[fieldName].toUpperCase() < b[fieldName].toUpperCase()) {
        return 1;
      }
      if (a[fieldName].toUpperCase() > b[fieldName].toUpperCase()) {
        return -1;
      }
      return 0;
    }

    if (sortBy === HISTORY_TABLE_FILTERS_EXCHANGE_NAME_ALPHABETICAL) {
      if (a[fieldName].toUpperCase() < b[fieldName].toUpperCase()) {
        return -1;
      }
      if (a[fieldName].toUpperCase() > b[fieldName].toUpperCase()) {
        return 1;
      }
      return 0;
    } else if (sortBy === HISTORY_TABLE_FILTERS_EXCHANGE_NAME_ALPHABETICAL_REVERSE) {
      if (a[fieldName].toUpperCase() < b[fieldName].toUpperCase()) {
        return 1;
      }
      if (a[fieldName].toUpperCase() > b[fieldName].toUpperCase()) {
        return -1;
      }
      return 0;
    }

    return 0;
  });

const selectTradeHistoryFiltered = createSelector(
  selectTradeHistoryTrades,
  selectTradeHistoryFilterBy,
  (trades, filterBy) => {
    let finalResults = trades;
    if (trades && trades.length) {

      if (filterBy.exchangeName && filterBy.exchangeName.length) {
        const filteredExchangeName = trades.filter((trade) =>
          filterBy.exchangeName && filterBy.exchangeName.some((filterExchangeName) =>
            filterExchangeName === trade.exchangeName
          )
        );
        finalResults = filteredExchangeName;
      }

      if (filterBy.tradeType && filterBy.tradeType.length) {
        const filteredTradeType = finalResults.filter((trade) =>
          filterBy.tradeType && filterBy.tradeType.some((selectedTradeType) =>
            selectedTradeType === trade.tradeType
          )
        ); 

        finalResults = filteredTradeType;
      }
    }
    return finalResults;
  }
)

export const selectTradeHistoryFilteredSorted = createSelector(
  selectTradeHistoryFiltered,
  selectTradeHistorySortBy,
  (filteredTrades, sortBy) => {
    return sortTrades(filteredTrades, sortBy);
  }
);
