import React, { PureComponent } from 'react';
import {
  FILTERS_ALLOWED_FIELDS,
  FILTERS_TRADE_TYPE_ASCENDING,
  FILTERS_TRADE_TYPE_DESCENDING,
  FILTERS_EXCHANGE_NAME_ASCENDING,
  FILTERS_EXCHANGE_NAME_DESCENDING,
  FILTERS_AMOUNT_ASCENDING,
  FILTERS_AMOUNT_DESCENDING,
  FILTERS_TIMESTAMP_ASCENDING,
  FILTERS_TIMESTAMP_DESCENDING,
  FILTERS_FEE_ASCENDING,
  FILTERS_FEE_DESCENDING
} from '../../constants';

class TradeHistoryTableHeadCell extends PureComponent {
  handleOnClickSortBy(str) {
    const { activeSortBy, onSetSortBy } = this.props;

    if (str === 'timestamp') {
      activeSortBy === FILTERS_TIMESTAMP_ASCENDING ?
        onSetSortBy(FILTERS_TIMESTAMP_DESCENDING)
        : onSetSortBy(FILTERS_TIMESTAMP_ASCENDING);
    }

    else if (str === 'type') {
      activeSortBy === FILTERS_TRADE_TYPE_ASCENDING ?
        onSetSortBy(FILTERS_TRADE_TYPE_DESCENDING)
        : onSetSortBy(FILTERS_TRADE_TYPE_ASCENDING);
    }

    else if (str === 'exchange') {
      activeSortBy === FILTERS_EXCHANGE_NAME_ASCENDING ?
        onSetSortBy(FILTERS_EXCHANGE_NAME_DESCENDING)
        : onSetSortBy(FILTERS_EXCHANGE_NAME_ASCENDING);
    }

    else if (str === 'amount') {
      activeSortBy === FILTERS_AMOUNT_ASCENDING ?
        onSetSortBy(FILTERS_AMOUNT_DESCENDING)
        : onSetSortBy(FILTERS_AMOUNT_ASCENDING);
    }

    else if (str === 'fee') {
      activeSortBy === FILTERS_FEE_ASCENDING ?
        onSetSortBy(FILTERS_FEE_DESCENDING)
        : onSetSortBy(FILTERS_FEE_ASCENDING);
    }
  }

  render() {
    const { field } = this.props;
    return (
      <th>
        {FILTERS_ALLOWED_FIELDS.includes(field) ?
          <button
            onClick={() => this.handleOnClickSortBy(field)}
            className="button-link"
          >
            {field}
            <i className="lnr lnr-sort-alpha-asc" />
          </button>
        : field}
      </th>
    )
  }
}

export default TradeHistoryTableHeadCell;