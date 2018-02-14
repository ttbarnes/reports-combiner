import React, { Component } from 'react';
import { connect } from 'react-redux';
import TradeHistoryTable from './TradeHistoryTable';
import Loading from './components/Loading';
// import { openSidebar } from './actions/sidebar';
import { getUserTradeHistory } from './actions/user';

class History extends Component {

  componentDidMount() {
    this.props.onGetTradeHistory();
  }

  render() {
    const {
      tradeHistory,
      promiseLoading,
      promiseError,
      promiseSuccess
    } = this.props;

    return (
      <div>
        {promiseLoading &&
          <Loading />
        }
        {promiseError &&
          <p className="form-error">Sorry, something has gone wrong :(</p>
        }

        {promiseSuccess &&
          <TradeHistoryTable
            tradeHistory={tradeHistory}
          />
        }

        </div>
    );
  }
}

const mapDispatchToProps = {
  onGetTradeHistory: () => getUserTradeHistory()
}

const mapStateToProps = (state) => ({
  tradeHistory: state.userTradeHistory,
  promiseLoading: state.user.promise.isLoading,
  promiseError: state.user.promise.hasError,
  promiseSuccess: state.user.promise.isSuccess
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
