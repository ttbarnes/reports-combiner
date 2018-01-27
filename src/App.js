import React, { Component } from 'react';
import MOCK_DATA from './mockData';
import './App.css';

const sortedMockData = MOCK_DATA.rows.sort((a, b) =>
  new Date(a[0]).getTime() - new Date(b[0]).getTime()
);

class App extends Component {
  render() {
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
                {row.map((c) =>
                  <td key={c + i}>
                    {c === 'binance' && <span className="binance">{c}</span>}
                    {c === 'bitfinex' && <span className="bitfinex">{c}</span>}
                    {c !== 'binance' && c !== 'bitfinex' && c}
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>

      </div>
    );
  }
}

export default App;
