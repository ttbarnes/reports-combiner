import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TradeHistoryTable from './TradeHistoryTable';
import Loading from './components/Loading';
import { openSidebar } from './actions/sidebar';
import { getUserTradeHistory } from './actions/user';
import { tradeHistoryActiveRow } from './actions/userTradeHistory';
import { SIDEBAR_TRADE_HISTORY_ADD_NOTE } from './constants';

class History extends Component {
  componentWillReceiveProps(nextProps) {
    const { user, tradeHistory } = this.props;
    const shouldGetTradeHistory = user.profile !== nextProps.user.profile &&
                                  nextProps.user.profile._id &&
                                  nextProps.user.profile.keys.length &&
                                  !tradeHistory.fields;
    if (shouldGetTradeHistory) {
      this.props.onGetTradeHistory();
    }
  }

  handleOnOpenAddNoteSidebar = (rowObj) => {
    const {
      onTradeHistoryActiveRow,
      onOpenAddNoteSidebar
    } = this.props;
    onTradeHistoryActiveRow(rowObj);
    onOpenAddNoteSidebar();
  }

  render() {
    const {
      user,
      tradeHistory,
      promiseLoading,
      promiseError,
      promiseSuccess
    } = this.props;

    const showNoExchangesMessage = (!promiseError &&
                                    user.profile &&
                                    user.profile.keys &&
                                    !user.profile.keys.length
                                   );

    return (
      <div>

        {promiseLoading &&
          <Loading />
        }

        {showNoExchangesMessage &&
          <div className="align-center">
            <p>No exchanges integrated.</p>
            <Link to="/integrations">add an exchange</Link>
          </div>
        }

        {promiseError &&
          <div className="align-center">
            <p>{promiseError}</p>
            {promiseError === 'No exchanges integrated' &&
              <Link to="/integrations">add an exchange</Link>
            }
          </div>
        }

        {promiseSuccess &&
          <TradeHistoryTable
            tradeHistory={tradeHistory}
            onClickAddNoteButton={this.handleOnOpenAddNoteSidebar}
          />
        }

      </div>
    );
  }
}

const mapDispatchToProps = {
  onGetTradeHistory: () => getUserTradeHistory(),
  onTradeHistoryActiveRow: (row) => tradeHistoryActiveRow(row),
  onOpenAddNoteSidebar: () => openSidebar(SIDEBAR_TRADE_HISTORY_ADD_NOTE)
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
