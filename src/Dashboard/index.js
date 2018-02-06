import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ExchangeApiInputs from '../components/ExchangeApiInputs';
import { postExchangeData } from '../actions/userExchanges';
import { POSSIBLE_EXCHANGES } from '../constants';

export class Dashboard extends PureComponent {
  onPostExchangeData = (exchange) => {
    this.props.onSubmitExchange(exchange);
  }

  render() {
    const {
      exchangePromise,
      user
    } = this.props;

    return (
      <div>

        <div className="align-center">
          {user.username && <h2>{user.username}{'\''}s Dashboard</h2>}
          {user.keys && <p>total keys: {user.keys.length}</p>}
        </div>

        <ExchangeApiInputs
          possibleExchanges={POSSIBLE_EXCHANGES}
          onSubmitForm={this.onPostExchangeData}
          exchangePromise={exchangePromise}
          userExchanges={user.keys}
        />

      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    exchangePromise: state.uiState.exchangePromise,
    user: state.user.profile
  }
}

const mapDispatchToProps = {
  onSubmitExchange: (exchange) => postExchangeData(exchange)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

