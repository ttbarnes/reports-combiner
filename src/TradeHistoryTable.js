import React, { Component } from 'react';
import moment from 'moment';
import MOCK_DATA from './mockData';

const mockDataAvailable = MOCK_DATA && MOCK_DATA.rows && MOCK_DATA.rows.length;

const sortedMockData = mockDataAvailable && MOCK_DATA.rows.sort((a, b) =>
  new Date(a[0]).getTime() - new Date(b[0]).getTime()
);

class TradeHistoryTable extends Component {

  cellIsDate(cellIndex) {
    if (MOCK_DATA.headings[cellIndex] === 'Date') {
      return true;
    }
    return false;
  }

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
                  return (
                    <td key={tdKey}>
                      {c === 'binance' && <span className="exchange-tag binance">{c}</span>}
                      {c === 'bitfinex' && <span className="exchange-tag bitfinex">{c}</span>}
                      {c === 'gdax' && <span className="exchange-tag gdax">{c}</span>}

                      {c !== 'binance' &&
                        c !== 'bitfinex' &&
                        c !== 'gdax' && (
                          <div>
                            {this.cellIsDate(cellIndex) ?
                              moment(c).format('Do MMM YYYY @ HH:mma')
                            : c}
                          </div>
                        )
                      }
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
