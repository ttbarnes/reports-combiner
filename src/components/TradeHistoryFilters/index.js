import React, { Component } from 'react';
import './styles.css';

class TradeHistoryFilters extends Component {
  constructor() {
    super();
    this.state = {
      exchangeNameFilters: []
    };
  }

  handleOnClickSortBy(str) {
    const { activeSortBy, onSetSortBy } = this.props;
    if (str === 'tradeType') {

      if (activeSortBy === 'tradeTypeAlphabetical') {
        onSetSortBy('tradeTypeAlphabeticalReverse');
      } else if (activeSortBy === 'tradeTypeAlphabeticalReverse') {
        onSetSortBy('tradeTypeAlphabetical');
      }

    }
  }

  handleOnClickFilterBy(propertyName, ev) {
    const { onSetFilterBy } = this.props;
    const targetName = ev.target.name;
    const isChecked = ev.target.checked;

    if (isChecked) {
      this.setState({
        exchangeNameFilters: [
          ...this.state.exchangeNameFilters,
          targetName
        ]
      }, () =>
        onSetFilterBy({
          [propertyName]: this.state.exchangeNameFilters
        })
      );
    } else {
      if (!this.state.exchangeNameFilters.length -1 <= 0) {
        return this.setState({
          exchangeNameFilters: this.state.exchangeNameFilters.filter((e) => e !== targetName)
        }, () =>
            onSetFilterBy({})
        ); 
      }
      return this.setState({
        exchangeNameFilters: this.state.exchangeNameFilters.filter((e) => e !== targetName)
      }, () =>
        onSetFilterBy({
          [propertyName]: this.state.exchangeNameFilters
        })
      );

    }
  }

  render() {
    const { exchangeNames } = this.props;
    return (
      <div className="trade-history-filters">

        <div>
          <h3>Sort by...</h3>

          <p>Trade type</p>
          <button
            onClick={() => this.handleOnClickSortBy('tradeType')}
            className="small"
          >
            A-Z
          </button>
        </div>

        <div>
          <h3>Filter by...</h3>

          {(exchangeNames && exchangeNames.length) ?
            <div>
              <p>Exchange name</p>
              <ul>
                {exchangeNames.map((e) =>
                  <li key={e}>

                    <label>
                      <input
                        type="checkbox"
                        onChange={(ev) => this.handleOnClickFilterBy('exchangeName', ev)}
                        name={e}
                      />
                      {e}
                    </label>

                  </li>
                )}
              </ul>
            </div>
          :
          null}
        </div>

      </div>
    )
  }
}

export default TradeHistoryFilters;
