import React, { Component } from 'react';
import Loading from '../components/Loading';
import ExchangeShowHide from '../components/ExchangeShowHide';
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
      onSubmitForm,
      onResetPromise
    } = this.props;

    const hasKeys = (exchange.key && exchange.secret);

    return (
      <div key={exchange.name}
        className={hasKeys ? 'exchange-input-box-container active' : 'exchange-input-box-container'}>
        <div className="exchange-input-box-container-inner">

          <ExchangeShowHide
            name={exchange.name}
            integrated={hasKeys}
          >

            {hasKeys ?
              <div>
                <p><small>API key: {exchange.key}</small></p>
                <p><small>API secret: {exchange.secret}</small></p>
                {exchange.passphrase && <p><small>Pass phrase: {exchange.passphrase}</small></p>}
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
            
          </ExchangeShowHide>


        </div>

      </div>
    )
  }
}

export default Exchange;
