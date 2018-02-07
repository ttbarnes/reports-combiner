import React, { Component } from 'react';
import Loading from '../components/Loading';
import ExchangeForm from './ExchangeForm';

class Exchange extends Component {

  componentWillReceiveProps(nextProps) {
    if ((this.props.promise.isSuccess !== nextProps.promise.isSuccess) &&
      nextProps.promise.isSuccess !== undefined) {
      setTimeout(() => {
        return this.props.onResetPromise();
      }, 2000);
    }
  }

  render() {
    const {
      exchange,
      promise,
      onInputChange,
      userExchange,
      onSubmitForm,
      onResetPromise
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
              onInputChange={onInputChange}
              onSubmitForm={onSubmitForm}
              onResetPromise={onResetPromise}
            />
          }

          {(promise && promise.exchangeName === exchange.name) &&
            <div>
              {promise.isLoading &&
                <Loading theme="dark" />
              }
              {promise.hasError &&
                <div className="promise-loading-cover"><p>Error :(</p></div>
              }
              {promise.isSuccess &&
                <div className="promise-loading-cover"><p>Success! <span role="img" aria-label="success">🚀</span></p></div>
              }
            </div>
          }

        </div>

      </div>
    )
  }
}

export default Exchange;
