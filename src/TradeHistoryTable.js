import React, { Component } from 'react';
import moment from 'moment';
const MOMENT_DATE_FORMAT = 'Do MMM YYYY @ HH:mma';

class TradeHistoryTable extends Component {

  isCellDate = (str) => str === 'timestamp';

  isCellType = (str) => str === 'type';

  isCellExchange = (str) => str === 'exchangeName';

  handleCryptopiaDateFormat(date) {
    return moment(date, 'YYYY-MM-DD-HH:mm:ss').format(MOMENT_DATE_FORMAT);
  }

  handleDateFormat(date) {
    return moment(date).format(MOMENT_DATE_FORMAT);
  }

  isCellAddNote(str) {
    return str === 'uiAddNote';
  }

  render() {
    const {
      tradeHistory,
      onAddNote
    } = this.props;

    const hasTrades = tradeHistory.fields.length && tradeHistory.trades.length;

    return (
      <div className="row">
        {hasTrades ?
          <div>
            <h4 className="heading-with-bg">All Trade History</h4>
            <table>
              <thead>
                <tr>
                  {tradeHistory.fields.map((field) => {
                    return (
                      <th key={field}>
                        {field}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {tradeHistory.trades.map((cell, cellIndex) => {
                  const cellKeys = Object.keys(cell);

                  return (
                    <tr key={cellIndex}>
                      {cellKeys.map((field) => {
                        const tdKey = field + cellIndex;

                        if (this.isCellDate(field)) {
                          return (
                            <td key={tdKey}>
                              {(cell.exchangeName === 'Binance' ||
                                cell.exchangeName === 'GDAX') && 
                                <span>{this.handleDateFormat(cell[field])}</span>
                              }
                              {cell.exchangeName === 'Cryptopia' && <span>{this.handleCryptopiaDateFormat(cell[field])}</span>}
                            </td>
                          );
                        }

                        if (this.isCellType(field)) {
                          return (
                            <td key={tdKey}>
                              <span className='exchange-tag exchange-type'>{cell[field]}</span>
                            </td>
                          );
                        }

                        if (this.isCellExchange(field)) {
                          return (
                            <td key={tdKey}>
                              <span className={`exchange-tag ${cell[field]}`}>{cell[field]}</span>
                            </td>
                          );
                        }

                        if (this.isCellAddNote(field)) {
                          return (
                            <td key={tdKey}>
                              <button
                                className="small"
                                onClick={onAddNote}
                              >add note
                              </button>
                            </td>
                          );
                        }
                       
                        return (
                          <td key={tdKey}>
                            {cell[field]}
                          </td>
                        );
                      }
                    )}
                    </tr>
                  );

                })}
              </tbody>
            </table>
          </div>
        :
        <div className="align-center">
          <p>No trade history to display :(</p>
        </div>
      }
      </div>
    )
  }
}

export default TradeHistoryTable;
