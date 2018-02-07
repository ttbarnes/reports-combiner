import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ExchangeApiInputs from '../components/ExchangeApiInputs';
import {
  postExchangeData,
  promiseExchangeReset
} from '../actions/uiState';
import { POSSIBLE_EXCHANGES } from '../constants';

export class Dashboard extends PureComponent {
  onPostExchangeData = (exchange) => {
    this.props.onSubmitExchange(exchange);
  }

  render() {
    const {
      promise,
      user,
      onResetPromise
    } = this.props;

    return (
      <div>

        <div className="align-center">
          {user.username && <h2>{user.username}{'\''}s Dashboard</h2>}
          {user.keys && <p><small>{user.keys.length}/4 exchanges</small></p>}
        </div>

        <ExchangeApiInputs
          possibleExchanges={POSSIBLE_EXCHANGES}
          onSubmitForm={this.onPostExchangeData}
          promise={promise}
          userExchanges={user.keys}
          onResetPromise={onResetPromise}
        />

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
)(Dashboard);

