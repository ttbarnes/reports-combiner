import React, { Component } from 'react';
import moment from 'moment';
import { HISTORY_TABLE_FIELDS_DISALLOWED } from '../../constants';
const MOMENT_DATE_FORMAT = 'Do MMM YYYY @ HH:mma';

class TradeHistoryTableBody extends Component {

  fieldShouldNotRender = (fieldName) => HISTORY_TABLE_FIELDS_DISALLOWED.includes(fieldName);

  isFieldDate = (str) => str === 'timestamp';

  isFieldType = (str) => str === 'tradeType';

  isFieldExchange = (str) => str === 'exchangeName';

  handleCryptopiaDateFormat(date) {
    return moment(date, 'YYYY-MM-DD-HH:mm:ss').format(MOMENT_DATE_FORMAT);
  }

  handleDateFormat(date) {
    return moment(date).format(MOMENT_DATE_FORMAT);
  }

  handleBinanceDateFormat(date) {
    const parseDate = moment(`/Date(${date})/`).toDate().getTime();
    return moment(parseDate).format(MOMENT_DATE_FORMAT);
  }

  isFieldNote(str) {
    return str === 'note';
  }

  render() {
    const {
      trades,
      onClickAddNoteButton
    } = this.props;

    return (
      <tbody>
        {trades.map((row, rowIndex) => {
          const rowKeys = Object.keys(row);

          return (
            <tr key={rowIndex}>
              {rowKeys.map((field) => {
                const tdKey = field + rowIndex;

                if (this.fieldShouldNotRender(field)) {
                  return null;
                }

                if (this.isFieldDate(field)) {
                  return (
                    <td key={tdKey}>
                      {row.exchangeName === 'GDAX' &&
                        <span>{this.handleDateFormat(row[field])}</span>
                      }
                      {row.exchangeName === 'Binance' &&
                        <span>{this.handleBinanceDateFormat(row[field])}</span>
                      }
                      {row.exchangeName === 'Cryptopia' && <span>{this.handleCryptopiaDateFormat(row[field])}</span>}
                    </td>
                  );
                }

                if (this.isFieldType(field)) {
                  return (
                    <td key={tdKey}>
                      <span className='exchange-tag exchange-type'>{row[field]}</span>
                    </td>
                  );
                }

                if (this.isFieldExchange(field)) {
                  return (
                    <td key={tdKey}>
                      <span className={`exchange-tag ${row[field]}`}>{row[field]}</span>
                    </td>
                  );
                }

                if (this.isFieldNote(field)) {
                  const note = row[field];
                  return (
                    <td key={tdKey}>
                      <div className="table-cell-flex">

                        <div>
                          {note.length ? <span>1 note</span> : <span />}
                        </div>

                        <div>
                          <button
                            className="small"
                            onClick={() => onClickAddNoteButton(row)}
                          >
                            <i className="lnr lnr-pencil" />
                          </button>
                        </div>

                      </div>
                    </td>
                  );
                }

                return (
                  <td key={tdKey}>
                    {row[field]}
                  </td>
                );
              }
              )}
            </tr>
          );

        })}
      </tbody>
    )
  }
}

export default TradeHistoryTableBody;
