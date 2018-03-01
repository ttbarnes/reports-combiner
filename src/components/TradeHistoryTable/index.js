import React, { PureComponent } from 'react';
import TradeHistoryTableHead from './TradeHistoryTableHead';
import TradeHistoryTableBody from './TradeHistoryTableBody';

class TradeHistoryTable extends PureComponent {

  render() {
    const {
      tradeHistory,
      tradeHistoryFilteredSorted,
      onClickDownloadButton,
      onClickAddNoteButton,
      activeSortBy,
      onSetSortBy
    } = this.props;

    const hasTrades = tradeHistory.fields &&
                      tradeHistory.fields.length &&
                      tradeHistoryFilteredSorted &&
                      tradeHistoryFilteredSorted.length;

    return (
      <div className="trade-history-table">
        {hasTrades ?
          <div>
            <div className="table-header">
              <div>
                <h4 className="heading-with-bg">All Trade History</h4>
                <button
                  className="small"
                  onClick={onClickDownloadButton}
                  >download
                </button>
              </div>
              <div>
              <p>
                <small>{tradeHistoryFilteredSorted.length} out of {tradeHistory.trades.length} trades</small>
              </p>
              </div>
            </div>

            <table>
              <TradeHistoryTableHead
                headings={tradeHistory.fields}
                activeSortBy={activeSortBy}
                onSetSortBy={onSetSortBy}
              />

              <TradeHistoryTableBody
                trades={tradeHistoryFilteredSorted}
                onClickAddNoteButton={onClickAddNoteButton}
              />
            </table>

          </div>
          :
          <div className="align-center">
            <p>No trades to display :(</p>
          </div>
        }
      </div>
    )
  }
}

export default TradeHistoryTable;
