import { createSelector } from 'reselect'

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

export const sortTrades = (trades, sortBy) =>
  trades && trades.length && trades.sort((a, b) => {
    let fieldName = '';
    if (sortBy === 'tradeTypeAlphabetical' ||
        sortBy === 'tradeTypeAlphabeticalReverse') {
      fieldName = 'tradeType';
    }

    if (sortBy === 'tradeTypeAlphabetical') {
      if (a[fieldName].toUpperCase() < b[fieldName].toUpperCase()) {
        return -1;
      }
      if (a[fieldName].toUpperCase() > b[fieldName].toUpperCase()) {
        return 1;
      }
      return 0;
    } else if (sortBy === 'tradeTypeAlphabeticalReverse') {
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
