import { createSelector } from 'reselect';
import { sortTrades } from '../utils';
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
