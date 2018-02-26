import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TradeHistoryTable from './TradeHistoryTable';
import Loading from './components/Loading';
import TradeHistoryFilters from './components/TradeHistoryFilters';
import { openSidebar } from './actions/sidebar';
import { getUserTradeHistory } from './actions/user';
import {
  tradeHistoryActiveTrade,
  tradeHistoryActiveTradeReset,
  tradeHistorySetSortBy
} from './actions/userTradeHistory';
import { SIDEBAR_TRADE_HISTORY_ADD_NOTE } from './constants';
import {
  selectTradeHistorySortBy,
  selectTradeHistorySorted
} from './selectors/tradeHistory';

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

  componentWillMount() {
    // set default filter
    this.props.onSetTradeHistorySortBy('tradeTypeAlphabetical');
  }

  componentWillUnmount() {
    this.props.onResetTradeHistoryActiveTrade();
  }

  handleOnAddNote = (rowObj) => {
    const {
      onTradeHistoryActiveTrade,
      onOpenAddNoteSidebar
    } = this.props;
    onTradeHistoryActiveTrade(rowObj);
    onOpenAddNoteSidebar();
  }

  render() {
    const {
      user,
      tradeHistory,
      filteredTradeHistory,
      activeSortBy,
      promiseLoading,
      promiseError,
      promiseSuccess,
      onSetTradeHistorySortBy
    } = this.props;

    const showNoExchangesMessage = (!promiseError &&
                                    user.profile &&
                                    user.profile.keys &&
                                    !user.profile.keys.length);

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
          <div>
            <TradeHistoryFilters
              onSetFilter={onSetTradeHistorySortBy}
              activeSortBy={activeSortBy}
            />

            <br />
            <br />

            <TradeHistoryTable
              tradeHistory={tradeHistory}
              filteredTradeHistory={filteredTradeHistory}
              onClickAddNoteButton={this.handleOnAddNote}
            />
          </div>
        }

      </div>
    );
  }
}

const mapDispatchToProps = {
  onGetTradeHistory: () => getUserTradeHistory(),
  onTradeHistoryActiveTrade: (row) => tradeHistoryActiveTrade(row),
  onOpenAddNoteSidebar: () => openSidebar(SIDEBAR_TRADE_HISTORY_ADD_NOTE),
  onResetTradeHistoryActiveTrade: () => tradeHistoryActiveTradeReset(),
  onSetTradeHistorySortBy: (sortBy) => tradeHistorySetSortBy(sortBy)
}

const mapStateToProps = (state) => ({
  user: state.user,
  tradeHistory: state.userTradeHistory.data,
  filteredTradeHistory: selectTradeHistorySorted(state),
  activeSortBy: selectTradeHistorySortBy(state),
  promiseLoading: state.user.promise.isLoading,
  promiseError: state.user.promise.hasError,
  promiseSuccess: state.user.promise.isSuccess  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
