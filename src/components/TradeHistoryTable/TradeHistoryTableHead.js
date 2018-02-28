import React, { PureComponent } from 'react';
import {
  HISTORY_TABLE_FILTERS_TRADE_TYPE_ALPHABETICAL,
  HISTORY_TABLE_FILTERS_TRADE_TYPE_ALPHABETICAL_REVERSE,
  HISTORY_TABLE_FILTERS_EXCHANGE_NAME_ALPHABETICAL,
  HISTORY_TABLE_FILTERS_EXCHANGE_NAME_ALPHABETICAL_REVERSE,
  HISTORY_TABLE_FILTERS_AMOUNT_ALPHABETICAL,
  HISTORY_TABLE_FILTERS_AMOUNT_ALPHABETICAL_REVERSE
} from '../../constants';

class TradeHistoryTableHead extends PureComponent {

  // TODO: create mappings for table body and table heading field names
  isFieldAmount = (str) => str === 'Amount';
  isFieldType = (str) => str === 'Type';
  isFieldExchange = (str) => str === 'Exchange';

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

    else if (str === 'exchangeName') {
      if (activeSortBy === HISTORY_TABLE_FILTERS_EXCHANGE_NAME_ALPHABETICAL) {
        return onSetSortBy(HISTORY_TABLE_FILTERS_EXCHANGE_NAME_ALPHABETICAL_REVERSE);
      } else if (activeSortBy === HISTORY_TABLE_FILTERS_EXCHANGE_NAME_ALPHABETICAL_REVERSE) {
        return onSetSortBy(HISTORY_TABLE_FILTERS_EXCHANGE_NAME_ALPHABETICAL);
      }
      return onSetSortBy(HISTORY_TABLE_FILTERS_EXCHANGE_NAME_ALPHABETICAL);
    }

    else if (str === 'amount') {
      if (activeSortBy === HISTORY_TABLE_FILTERS_AMOUNT_ALPHABETICAL) {
        return onSetSortBy(HISTORY_TABLE_FILTERS_AMOUNT_ALPHABETICAL_REVERSE);
      } else if (activeSortBy === HISTORY_TABLE_FILTERS_AMOUNT_ALPHABETICAL_REVERSE) {
        return onSetSortBy(HISTORY_TABLE_FILTERS_AMOUNT_ALPHABETICAL);
      }
      return onSetSortBy(HISTORY_TABLE_FILTERS_AMOUNT_ALPHABETICAL);
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
