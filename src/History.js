import React, { Component } from 'react';
import TradeHistoryTable from './TradeHistoryTable';
import TradeHistoryChart from './TradeHistoryChart';
import { API_ROOT } from './constants';

class History extends Component {

  getCsv = () => {
    fetch(`${API_ROOT}/combined-history/local/download`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res => res.json()))
      .then((data) =>
        window.open(data.link, '_blank')
      );
  }

  render() {

    return (
      <div>

        <div className="row large">
          <TradeHistoryTable />
        </div>

        <div className="row large">
          <TradeHistoryChart />
        </div>

        <button style={{ float: 'left' }} onClick={this.getCsv}>
          Download test CV
        </button>

      </div>
    );
  }
}

export default History;
