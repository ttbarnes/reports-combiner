import React, { Component } from 'react';
import MOCK_DATA from './mockData';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Reports Combiner</h1>

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
            {MOCK_DATA.rows.map((row, i) =>
              <tr key={row + i}>
                {row.map((c) =>
                  <td key={c + i}>
                    {c}
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
