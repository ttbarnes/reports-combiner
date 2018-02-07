import React, { Component } from 'react';
import ExchangeForm from './ExchangeForm';

class Exchange extends Component {

  render() {
    const {
      exchange,
      promise,
      onInputChange,
      userExchange,
      onSubmitForm
    } = this.props;

    return (
      <div key={exchange.name} className="exchange-input-box-container">
        <div className="exchange-input-box-container-inner">

          <h3 className="heading-with-bg">{exchange.name}</h3>

          {userExchange ?
            <div>
              <p>Integrated! awesome! <span role="img" aria-label="awesome">😊 🎉</span></p>
              <p><small>API key: {userExchange.key}</small></p>
              <p><small>API secret: {userExchange.secret}</small></p>
            </div>
            :
            <ExchangeForm
              exchange={exchange}
              promise={promise}
              onInputChange={onInputChange}
              onSubmitForm={onSubmitForm}
            />

          }
        </div>

      </div>
    )
  }
}

export default Exchange;
