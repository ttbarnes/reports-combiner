import React, { Component } from 'react';
import moment from 'moment';
import MOCK_DATA from './mockData';

const mockDataAvailable = MOCK_DATA && MOCK_DATA.rows && MOCK_DATA.rows.length;

const sortedMockData = mockDataAvailable && MOCK_DATA.rows.sort((a, b) =>
  new Date(a[0]).getTime() - new Date(b[0]).getTime()
);

class TradeHistoryTable extends Component {

  isCellDate = (cellIndex) => MOCK_DATA.headings[cellIndex] === 'Date';

  isCellBuy = (str) => str.match(/BUY|deposit\b/ig);

  isCellSell = (str) => str.match(/SELL|withdrawal\b/ig);

  isCellExchange = (str) => str.match(/binance|bitfinex|gdax\b/ig);

  render() {
    if (!mockDataAvailable) return <p>No data :(</p>

    return (
      <div>
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
                        moment(c).format('Do MMM YYYY @ HH:mma')
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
