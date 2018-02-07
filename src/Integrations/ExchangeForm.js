import React, { Component } from 'react';
import Loading from '../components/Loading';

class ExchangeForm extends Component {

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
      onSubmitForm
    } = this.props;

    return (
      <div>
        {(promise && promise.exchange === exchange.name) &&
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

        <form onSubmit={ev => this.props.onSubmitForm(ev)}>
          <div>
            <label>API key</label>
            <input
              type="text"
              onChange={onInputChange}
              placeholder="asdfADSFasdfASDFasdfADSFasdfASDF"
              name={exchange.name}
              data-key="apiKey"
            />
          </div>

          <div>
            <label>API secret</label>
            <input
              type="text"
              onChange={onInputChange}
              placeholder="FDSAfdsaFDSAfdsaFDSAfdsaFDSAfdsa"
              name={exchange.name}
              data-key="apiSecret"
            />
          </div>
          <div>
            <button
              onClick={onSubmitForm}
              data-provider={exchange.name}
              className="small block"
            >Add</button>
          </div>

        </form>
      </div>
    )
  }
}

export default ExchangeForm;
