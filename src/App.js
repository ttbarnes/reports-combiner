import React, { Component } from 'react';
import MOCK_DATA from './mockData';
import './App.css';

const mockDataAvailable = MOCK_DATA && MOCK_DATA.rows && MOCK_DATA.rows.length;

const sortedMockData = mockDataAvailable && MOCK_DATA.rows.sort((a, b) =>
  new Date(a[0]).getTime() - new Date(b[0]).getTime()
);

class App extends Component {
  render() {
    if (!mockDataAvailable) return <p>No data :(</p>
    return (
      <div className="App">
        <header>
          <h1>Reports Combiner</h1>
        </header>

        <h4>All Trade History</h4>
        <table>
          <thead>
            <tr>
              {MOCK_DATA.headings.map((cell, i) =>
                <td
                  key={cell + i}
                >
                  {cell}
                </td>
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
                       c !== 'gdax' &&
                       c
                      }
                    </td>
                  );
                })}
              </tr>
            )}
          </tbody>
        </table>

      </div>
    );
  }
}

export default App;
