import React, { PureComponent } from 'react';
import {
  HISTORY_TABLE_FILTERS_TRADE_TYPE_ALPHABETICAL,
  HISTORY_TABLE_FILTERS_TRADE_TYPE_ALPHABETICAL_REVERSE
} from '../../constants';

class TradeHistoryTableHead extends PureComponent {

  isFieldType = (str) => str === 'Type';

  handleOnClickSortBy(str) {
    const { activeSortBy, onSetSortBy } = this.props;
    if (str === 'tradeType') {
      if (activeSortBy === HISTORY_TABLE_FILTERS_TRADE_TYPE_ALPHABETICAL) {
        return onSetSortBy(HISTORY_TABLE_FILTERS_TRADE_TYPE_ALPHABETICAL_REVERSE);
      } else if (activeSortBy === HISTORY_TABLE_FILTERS_TRADE_TYPE_ALPHABETICAL_REVERSE) {
        return onSetSortBy(HISTORY_TABLE_FILTERS_TRADE_TYPE_ALPHABETICAL);
      }
      return onSetSortBy(HISTORY_TABLE_FILTERS_TRADE_TYPE_ALPHABETICAL);

    }
  }

  render() {
    const {
      headings,
      activeSortBy
    } = this.props;

    return (
      <thead>
        <tr>
          {headings.map((field) => {

            if (this.isFieldType(field)) {
              return (
                <th
                  key={field}
                  onClick={() => this.handleOnClickSortBy('tradeType')}
                >
                  {field}
                  {activeSortBy === HISTORY_TABLE_FILTERS_TRADE_TYPE_ALPHABETICAL_REVERSE ?
                    <i className="lnr lnr-arrow-down" />
                    :
                    <i className="lnr lnr-arrow-up" />
                  }
                </th>
              );
            }

            return (
              <th key={field}>
                {field}
              </th>
            );
          })}
        </tr>
      </thead>
    )
  }
}

export default TradeHistoryTableHead;
