import React, { Component } from 'react';
import { connect } from 'react-redux';
import TradeHistoryTable from './TradeHistoryTable';
import Loading from './components/Loading';
import { openSidebar } from './actions/sidebar';
import { getUserTradeHistory } from './actions/user';
import { SIDEBAR_ADD_NOTE } from './constants';

class History extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.user.profile !== nextProps.user.profile &&
        !this.props.tradeHistory.fields) {
      this.props.onGetTradeHistory(); 
    }
  }

  render() {
    const {
      tradeHistory,
      promiseLoading,
      promiseError,
      promiseSuccess,
      onAddNote
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
            onAddNote={onAddNote}
          />
        }

      </div>
    );
  }
}

const mapDispatchToProps = {
  onGetTradeHistory: () => getUserTradeHistory(),
  onAddNote: () => openSidebar(SIDEBAR_ADD_NOTE)
}

const mapStateToProps = (state) => ({
  user: state.user,
  tradeHistory: state.userTradeHistory.data,
  promiseLoading: state.user.promise.isLoading,
  promiseError: state.user.promise.hasError,
  promiseSuccess: state.user.promise.isSuccess
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
