import React, { Component } from 'react';
import { connect } from 'react-redux';
import { POSSIBLE_EXCHANGES } from '../constants';
import Exchange from './Exchange';
import {
  postExchangeData,
  promiseExchangeReset
} from '../actions/uiState';
import './styles.css';

// this could be a lot better
// this is quick v1 from cleaning other things up

class Integrations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allExchanges: []
    }
  }

  componentDidMount() {
    let exchangesAsObjs = [];
    if (POSSIBLE_EXCHANGES && POSSIBLE_EXCHANGES.length) {
      POSSIBLE_EXCHANGES.map((e) =>
        exchangesAsObjs = [...exchangesAsObjs, { name: e }]
      );
    }
    this.setState({
      allExchanges: exchangesAsObjs
    });
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
    this.setState({
      allExchanges
    });
  }

  getUserExchange(name) {
    const { user } = this.props;
    if (!user.keys) return null;
    return user.keys.find(e => e.name === name);
  }

  userExchangeExists(exchangeName) {
    const { user } = this.props;
    if (
      (user.keys && user.keys.length) &&
      this.getUserExchange(exchangeName)
    ) {
      return true;
    }
    return false;
  }
  
  onPostExchangeData = (ev) => {
    ev.preventDefault();
    const exchange = this.state.allExchanges.find((e) => e.name === ev.target.dataset.provider);
    this.props.onSubmitExchange(exchange);
  }

  render() {
    const {
      promise,
      onResetPromise
    } = this.props;
    const { allExchanges } = this.state;

    return (
      <div className="exchange-api-inputs">

        {allExchanges.length ? (
          allExchanges.map((exchange) =>
            <Exchange
              exchange={exchange}
              key={exchange.name}
              userExchange={this.getUserExchange(exchange.name)}
              onInputChange={this.onInputChange}
              onSubmitForm={this.onPostExchangeData}
              promise={promise}
              onResetPromise={onResetPromise}
            />
          )
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    promise: state.uiState.promise,
    user: state.user.profile
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

