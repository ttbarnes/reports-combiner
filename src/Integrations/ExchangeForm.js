import React, { Component } from 'react';

class ExchangeForm extends Component {

  render() {
    const {
      exchange,
      onInputChange,
      onSubmitForm
    } = this.props;

    return (
      <div>
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
          {exchange.requiresPassphrase &&
            <div>
              <label>Passphrase</label>
              <input
                type="text"
                onChange={onInputChange}
                placeholder="uiopwerty"
                name={exchange.name}
                data-key="passphrase"
              />
            </div>
          }
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
