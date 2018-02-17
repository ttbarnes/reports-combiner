import { createSelector } from 'reselect'

const selectTradeHistoryBase = state => state.userTradeHistory;

const selectTradeHistoryData = createSelector(
  selectTradeHistoryBase,
  tradeHistory => tradeHistory.data
);

const selectTradeHistoryTrades = createSelector(
  selectTradeHistoryData,
  tradeHistory => tradeHistory.trades
);

export const selectTradeHistoryByDate = createSelector(
  selectTradeHistoryTrades,
  trades => trades.sort((a: any, b: any): any =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
);
