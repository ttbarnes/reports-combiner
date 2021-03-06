import React, { Component } from 'react';
import { FILTERS_TRADE_TYPE_VALUES } from '../../constants';
import './styles.css';

class TradeHistoryFilters extends Component {
  constructor() {
    super();
    this.state = {
      exchangeName: [],
      tradeType: []
    };
  }

  handleOnClickFilterByExchangeName(propertyName, ev) {
    const { onSetFilterBy } = this.props;
    const targetName = ev.target.name;
    const isChecked = ev.target.checked;

    if (isChecked) {
      this.setState({
        exchangeName: [
          ...this.state.exchangeName,
          targetName
        ]
      }, () =>
        onSetFilterBy({
          exchangeName: this.state.exchangeName,
          tradeType: this.state.tradeType
        })
      );
    } else {
      if (!this.state.exchangeName.length -1 <= 0) {
        return this.setState({
          exchangeName: this.state.exchangeName.filter((e) => e !== targetName)
        }, () =>
            onSetFilterBy({
              exchangeName: this.state.exchangeName,
              tradeType: this.state.tradeType
            })
        ); 
      }
      return this.setState({
        exchangeName: this.state.exchangeName.filter((e) => e !== targetName)
      }, () =>
        onSetFilterBy({
          exchangeName: this.state.exchangeName,
          tradeType: this.state.tradeType
        })
      );
    }
  }

  handleOnClickFilterByTradeType(propertyName, ev) {
    const { onSetFilterBy } = this.props;
    const targetName = ev.target.name;
    const isChecked = ev.target.checked;

    if (isChecked) {
      this.setState({
        tradeType: [
          ...this.state.tradeType,
          targetName
        ]
      }, () =>
        onSetFilterBy({
          exchangeName: this.state.exchangeName,
          tradeType: this.state.tradeType
        })
      );
    } else {
      if (!this.state.tradeType.length - 1 <= 0) {
        return this.setState({
          tradeType: this.state.tradeType.filter((e) => e !== targetName)
        }, () =>
          onSetFilterBy({
            exchangeName: this.state.exchangeName,
            tradeType: this.state.tradeType
          })
        );
      }
      return this.setState({
        tradeType: this.state.tradeType.filter((e) => e !== targetName)
      }, () =>
          onSetFilterBy({
            exchangeName: this.state.exchangeName,
            tradeType: this.state.tradeType
          })
      );
    }

  }

  render() {
    const { exchangeNames } = this.props;
    return (
      <div className="trade-history-filters">

        <div>
          <h3>Filter by...</h3>

          {(exchangeNames && exchangeNames.length) ?
            <div>
              <p>Exchange name</p>
              <ul>
                {exchangeNames.map((e) =>
                  <li key={e}>

                    <label className="checkbox-wrap">
                      <input
                        type="checkbox"
                        onChange={(ev) => this.handleOnClickFilterByExchangeName('exchangeName', ev)}
                        name={e}
                      />
                      <span>{e}</span>
                    </label>

                  </li>
                )}
              </ul>
            </div>
          :
          null}

          <br />
          <br />
            
          <div>
            <p>Trade Type</p>
            <ul>
            {FILTERS_TRADE_TYPE_VALUES.map((tradeType) =>
                <li key={tradeType}>
                  <label className="checkbox-wrap">
                    <input
                      type="checkbox"
                      onChange={(ev) => this.handleOnClickFilterByTradeType('tradeType', ev)}
                      name={tradeType}
                    />
                    <span>{tradeType.toUpperCase()}</span>
                  </label>
                </li>
            )}
            </ul>


          </div>

        </div>

      </div>
    )
  }
}

export default TradeHistoryFilters;
