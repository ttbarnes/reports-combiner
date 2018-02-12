import React, { Component } from 'react';
import { connect } from 'react-redux';
import { difference } from 'lodash';
import {
  EXCHANGES_MAP,
  SUBSCRIPTION_PREMIUM
} from '../constants';
import Exchange from './Exchange';
import {
  postExchangeData,
  promiseExchangeReset
} from '../actions/uiState';
import IntegrationsCount from '../components/IntegrationsCount';
import './styles.css';

// needs complete refactor
// this is quick v1 from merging other things

const PlaceholderExchange = () => (
  <div className="exchange-input-box-container">
    <div className="exchange-input-box-container-inner">
      <div className="show-hide-exchange">
        <div className="cta">
          <h3 className="button">Placeholder</h3>
        </div>
      </div>
    </div>
  </div>
);

class Integrations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allExchanges: [],
      selectedExchange: {}
    }
  }

  componentDidMount() {
    this.mapExchanges();
  }

  mapExchanges() {
    let allExchanges = [...EXCHANGES_MAP];
    const { user } = this.props;
    if (user.keys.length) {
      user.keys.map((userExchange) => {
        const exchangeIndex = allExchanges.findIndex((e) => e.name === userExchange.name);
        const requiresPassphrase = allExchanges[exchangeIndex].requiresPassphrase;
        const hasPassphrase = userExchange.passphrase && userExchange.passphrase !== null;

        allExchanges[exchangeIndex] = { ...userExchange };
        if (requiresPassphrase && hasPassphrase) {
          return allExchanges[exchangeIndex].passphrase = userExchange.passphrase;
        }
        else if (requiresPassphrase) {
          return allExchanges[exchangeIndex].requiresPassphrase = true;
        }
        return userExchange;
      });
    }
    this.setState({
      allExchanges
    });
  }

  componentWillReceiveProps(nextProps) {
    // TEMP solution to resubmit form after subscription success
    // TODO: redux/reselect/redux-form actions/observables
    const resubmitForm = (this.props.subscriptionModal.show === true &&
                         !nextProps.subscriptionModal.show) &&
                         nextProps.user.subscription === SUBSCRIPTION_PREMIUM;

    if (resubmitForm) {
      const { selectedExchange } = this.state;
      this.props.onSubmitExchange(selectedExchange);
    }

    // TEMP solution to get new user exhchanges in props/state
    if (difference(this.props.user.keys, nextProps.user.keys)) {
      this.mapExchanges();
    }
  }

  getExchangeInState(str) {
    return this.state.allExchanges.find((e) => e.name === str);
  }

  onInputChange = (ev) => {
    const dataKey = ev.target.dataset.key;
    const allExchanges = this.state.allExchanges;
    const exchangeInState = this.getExchangeInState(ev.target.name);

    if (dataKey === 'apiKey') {
      exchangeInState.apiKey = ev.target.value;
    }
    if (dataKey === 'apiSecret') {
      exchangeInState.apiSecret = ev.target.value;
    }
    if (dataKey === 'passphrase') {
      exchangeInState.passphrase = ev.target.value;
    }
    this.setState({
      allExchanges
    });
  }
  
  onPostExchangeData = (ev) => {
    ev.preventDefault();
    const exchange = this.state.allExchanges.find((e) => e.name === ev.target.dataset.provider);
    this.setState({
      selectedExchange: exchange
    });

    this.props.onSubmitExchange(exchange);
  }

  render() {
    const {
      promise,
      onResetPromise,
      user
    } = this.props;
    const { allExchanges } = this.state;

    return (
      <div className="align-center">

        <IntegrationsCount
          integrations={user.keys}
          totalCount={EXCHANGES_MAP.length}
        />

        <div className="exchange-inputs-container">
          {allExchanges.length ? (
            allExchanges.map((exchange) =>
              <Exchange
                exchange={exchange}
                key={exchange.name}
                onInputChange={this.onInputChange}
                onSubmitForm={this.onPostExchangeData}
                promise={promise}
                onResetPromise={onResetPromise}
              />
            )
          ) : null}
        
          <PlaceholderExchange name="Placeholder A" />
          <PlaceholderExchange name="Placeholder B" />
          <PlaceholderExchange name="Placeholder C" />
          <PlaceholderExchange name="Placeholder D" />
          <PlaceholderExchange name="Placeholder E" />
          <PlaceholderExchange name="Placeholder F" />

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    promise: state.uiState.promise,
    user: state.user.profile,
    subscriptionModal: state.uiState.subscriptionModal
  }
}

const mapDispatchToProps = {
  onSubmitExchange: (exchange) => postExchangeData(exchange),
  onResetPromise: () => promiseExchangeReset()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Integrations);

