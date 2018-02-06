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
    const { exchangePromise } = this.props;

    return (
      <div>

        <h2 className="align-center">Dashboard</h2>

        <ExchangeApiInputs
          exchanges={POSSIBLE_EXCHANGES}
          onSubmitForm={this.onPostExchangeData}
          exchangePromise={exchangePromise}
        />

        </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    exchangePromise: state.uiState.exchangePromise
  }
}

const mapDispatchToProps = {
  onSubmitExchange: (exchange) => postExchangeData(exchange)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

