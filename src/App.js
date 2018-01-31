import React, { Component } from 'react';
import TradeHistoryTable from './TradeHistoryTable';
import TradeHistoryChart from './TradeHistoryChart';
import './App.css';

class App extends Component {
  render() {

    return (
      <div className="App">
        <header>
          <h1>Reports Combiner</h1>
        </header>

        <div className="row large">
          <TradeHistoryTable />
        </div>

        <div className="row large">
          <TradeHistoryChart />
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />



      </div>
    );
  }
}

export default App;
