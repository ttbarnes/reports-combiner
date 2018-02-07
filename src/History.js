import React, { Component } from 'react';
import { connect } from 'react-redux';
import TradeHistoryTable from './TradeHistoryTable';
import TradeHistoryChart from './TradeHistoryChart';
import { API_ROOT } from './constants';
import { openSidebar } from './actions/sidebar';

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
    const { onAddNote } = this.props;

    return (
      <div>

        <div className="row large">
          <TradeHistoryTable onAddNote={onAddNote}/>
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

const mapDispatchToProps = {
  onAddNote: () => openSidebar('ADD_NOTE')
}

export default connect(
  null,
  mapDispatchToProps
)(History);
