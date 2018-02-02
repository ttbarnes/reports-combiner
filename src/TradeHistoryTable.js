import React, { Component } from 'react';
import moment from 'moment';
import MOCK_DATA from './mock-data';

const MOMENT_DATE_FORMAT = 'Do MMM YYYY @ HH:mma';

const mockDataAvailable = MOCK_DATA && MOCK_DATA.rows && MOCK_DATA.rows.length;

const sortedMockData = mockDataAvailable && MOCK_DATA.rows.sort((a, b) =>
  new Date(a[0]).getTime() - new Date(b[0]).getTime()
);

class TradeHistoryTable extends Component {

  isCellDate = (cellIndex) => MOCK_DATA.headings[cellIndex] === 'Date';

  isCellBuy = (str) => str.match(/BUY|deposit\b/ig);

  isCellSell = (str) => str.match(/SELL|withdrawal\b/ig);

  isCellExchange = (str) => str.match(/binance|bitfinex|gdax|cryptopia\b/ig);

  // cryptopia provides dates with this formatting: DD/MM/YYYY HH:mm:ssa
  // we want: Do MMM YYYY @ HH:mma
  handleCryptopiaDateFormat(date) {
    return moment(date, 'DD/MM/YYYY HH:mm:ssa').format(MOMENT_DATE_FORMAT)
  }

  render() {
    if (!mockDataAvailable) return <p>No data :(</p>

    return (
      <div className="row">
        <h4>All Trade History</h4>
        <table>
          <thead>
            <tr>
              {MOCK_DATA.headings.map((cell, i) =>
                <th
                  key={cell + i}
                >
                  {cell}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedMockData.map((row, i) =>
              <tr key={row + i}>
                {row.map((c, cellIndex) => {
                  const exchangeName = row[row.length - 1]; // exchange name is always last field
                  const tdKey = `${exchangeName}-${c}-${cellIndex}`;

                  if (this.isCellBuy(c)) {
                    return (
                      <td key={tdKey}>
                        <span className="exchange-tag buy-or-deposit">{c}</span>
                      </td>
                    );
                  }

                  if (this.isCellSell(c)) {
                    return (
                      <td key={tdKey}>
                        <span className="exchange-tag sell-or-withdraw">{c}</span>
                      </td>
                    );
                  }

                  if (this.isCellExchange(c)) {
                    return (
                      <td key={tdKey}>
                        <span className={`exchange-tag ${c}`}>{c}</span>
                      </td>
                    );
                  }

                  return (
                    <td key={tdKey}>
                      {this.isCellDate(cellIndex) ?
                        <div>
                          {exchangeName === 'cryptopia' ?
                            this.handleCryptopiaDateFormat(c) : 
                            moment(c).format(MOMENT_DATE_FORMAT)
                          }
                        </div>
                      : c}
                    </td>
                  );

                })}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default TradeHistoryTable;
