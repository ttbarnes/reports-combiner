import React, { Component } from 'react';

class TradeHistoryFilters extends Component {

  handleOnClick(str) {
    const { activeSortBy } = this.props;
    if (str === 'tradeType') {

      if (activeSortBy === 'tradeTypeAlphabetical') {
        this.props.onSetFilter('tradeTypeAlphabeticalReverse');
      } else if (activeSortBy === 'tradeTypeAlphabeticalReverse') {
        this.props.onSetFilter('tradeTypeAlphabetical');
      }

    }
  }
  
  render() {
    return (
      <div>
        <p>Sort/filter</p>
        <button
          onClick={() => this.handleOnClick('tradeType')}
          className="small"
        >
          sort by trade type
        </button>
      </div>
    )
  }
}

export default TradeHistoryFilters;
