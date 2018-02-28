import React, { PureComponent } from 'react';
import {
  FILTERS_TRADE_TYPE_ASCENDING,
  FILTERS_TRADE_TYPE_DESCENDING,
  FILTERS_EXCHANGE_NAME_ASCENDING,
  FILTERS_EXCHANGE_NAME_DESCENDING,
  FILTERS_AMOUNT_ASCENDING,
  FILTERS_AMOUNT_DESCENDING,
  FILTERS_TIMESTAMP_ASCENDING,
  FILTERS_TIMESTAMP_DESCENDING
} from '../../constants';

class TradeHistoryTableHead extends PureComponent {

  // TODO: create mappings for table body and table heading field names
  isFieldTimestamp = (str) => str === 'Timestamp';
  isFieldAmount = (str) => str === 'Amount';
  isFieldType = (str) => str === 'Type';
  isFieldExchange = (str) => str === 'Exchange';

  handleOnClickSortBy(str) {
    const { activeSortBy, onSetSortBy } = this.props;

    if (str === 'timestamp') {
      if (activeSortBy === FILTERS_TIMESTAMP_ASCENDING) {
        return onSetSortBy(FILTERS_TIMESTAMP_DESCENDING);
      } else if (activeSortBy === FILTERS_TIMESTAMP_DESCENDING) {
        return onSetSortBy(FILTERS_TIMESTAMP_ASCENDING);
      }
      return onSetSortBy(FILTERS_TIMESTAMP_ASCENDING);
    }

    else if (str === 'tradeType') {
      if (activeSortBy === FILTERS_TRADE_TYPE_ASCENDING) {
        return onSetSortBy(FILTERS_TRADE_TYPE_DESCENDING);
      } else if (activeSortBy === FILTERS_TRADE_TYPE_DESCENDING) {
        return onSetSortBy(FILTERS_TRADE_TYPE_ASCENDING);
      }
      return onSetSortBy(FILTERS_TRADE_TYPE_ASCENDING);
    }

    else if (str === 'exchangeName') {
      if (activeSortBy === FILTERS_EXCHANGE_NAME_ASCENDING) {
        return onSetSortBy(FILTERS_EXCHANGE_NAME_DESCENDING);
      } else if (activeSortBy === FILTERS_EXCHANGE_NAME_DESCENDING) {
        return onSetSortBy(FILTERS_EXCHANGE_NAME_ASCENDING);
      }
      return onSetSortBy(FILTERS_EXCHANGE_NAME_ASCENDING);
    }

    else if (str === 'amount') {
      if (activeSortBy === FILTERS_AMOUNT_ASCENDING) {
        return onSetSortBy(FILTERS_AMOUNT_DESCENDING);
      } else if (activeSortBy === FILTERS_AMOUNT_DESCENDING) {
        return onSetSortBy(FILTERS_AMOUNT_ASCENDING);
      }
      return onSetSortBy(FILTERS_AMOUNT_ASCENDING);
    }

  }

  render() {
    const { headings } = this.props;

    return (
      <thead>
        <tr>
          {headings.map((field) => {
            if (this.isFieldTimestamp(field)) {
              return (
                <th
                  key={field}
                >
                  <button
                    onClick={() => this.handleOnClickSortBy('timestamp')}
                    className="button-link"
                  >
                    {field}
                    <i className="lnr lnr-sort-alpha-asc" />
                  </button>
                </th>
              );
            }

            if (this.isFieldAmount(field)) {
              return (
                <th
                  key={field}
                >
                  <button
                    onClick={() => this.handleOnClickSortBy('amount')}
                    className="button-link"
                  >
                    {field}
                    <i className="lnr lnr-sort-alpha-asc" />
                  </button>
                </th>
              );
            }

            if (this.isFieldType(field)) {
              return (
                <th
                  key={field}
                >
                  <button
                    onClick={() => this.handleOnClickSortBy('tradeType')}
                    className="button-link"
                  >
                    {field}
                    <i className="lnr lnr-sort-alpha-asc" />
                  </button>
                </th>
              );
            }

            if (this.isFieldExchange(field)) {
              return (
                <th
                  key={field}
                >
                  <button
                    onClick={() => this.handleOnClickSortBy('exchangeName')}
                    className="button-link"
                  >
                    {field}
                    <i className="lnr lnr-sort-alpha-asc" />
                  </button>
                </th>
              )
              
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
