import React, { Component } from 'react';
import TradeHistoryTable from './TradeHistoryTable';
import './App.css';

class App extends Component {
  render() {

    return (
      <div className="App">
        <header>
          <h1>Reports Combiner</h1>
        </header>

        <TradeHistoryTable />

      </div>
    );
  }
}

export default App;
