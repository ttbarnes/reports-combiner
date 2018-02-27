import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TradeHistoryTable from '../../components/TradeHistoryTable';
import Loading from '../../components/Loading';
import TradeHistoryFilters from '../../components/TradeHistoryFilters';
import { openSidebar } from '../../actions/sidebar';
import { getUserTradeHistory } from '../../actions/user';
import {
  tradeHistoryActiveTrade,
  tradeHistoryActiveTradeReset,
  tradeHistorySetSortBy,
  tradeHistorySetFilterBy,
  tradeHistoryFilterBySortByReset
} from '../../actions/userTradeHistory';
import {
  selectTradeHistorySortBy,
  selectTradeHistoryFilteredSorted
} from '../../selectors/tradeHistory';
import { SIDEBAR_TRADE_HISTORY_ADD_NOTE } from '../../constants';

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
    // set default sort by
    this.props.onSetTradeHistorySortBy('tradeTypeAlphabetical');
  }

  componentWillUnmount() {
    this.props.onResetTradeHistoryActiveTrade();
    this.props.onResetTradeHistoryFilterBySortBy();
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
      tradeHistoryFilteredSorted,
      promiseLoading,
      promiseError,
      promiseSuccess,
      activeSortBy,
      onSetTradeHistorySortBy,
      onSetTradeHistoryFilterBy
    } = this.props;

    // todo: replace with selector
    const exchangesIntegrated = user.profile.keys && user.profile.keys.map((e) => e.name);

    const showNoExchangesMessage = (!promiseError &&
                                    user.profile &&
                                    user.profile.keys &&
                                    !user.profile.keys.length);

    return (
      <article className="history-container">

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
          <div className="history-container-filters-table">

            <TradeHistoryFilters
              onSetSortBy={onSetTradeHistorySortBy}
              onSetFilterBy={onSetTradeHistoryFilterBy}
              activeSortBy={activeSortBy}
              exchangeNames={exchangesIntegrated}
            />

            <br />
            <br />

            <TradeHistoryTable
              tradeHistory={tradeHistory}
              tradeHistoryFilteredSorted={tradeHistoryFilteredSorted}
              onClickAddNoteButton={this.handleOnAddNote}
            />

          </div>
        }

      </article>
    );
  }
}

const mapDispatchToProps = {
  onGetTradeHistory: () => getUserTradeHistory(),
  onOpenAddNoteSidebar: () => openSidebar(SIDEBAR_TRADE_HISTORY_ADD_NOTE),
  onTradeHistoryActiveTrade: (row) => tradeHistoryActiveTrade(row),
  onResetTradeHistoryActiveTrade: () => tradeHistoryActiveTradeReset(),
  onSetTradeHistorySortBy: (sortBy) => tradeHistorySetSortBy(sortBy),
  onSetTradeHistoryFilterBy: (filterBy) => tradeHistorySetFilterBy(filterBy),
  onResetTradeHistoryFilterBySortBy: () => tradeHistoryFilterBySortByReset(),
}

const mapStateToProps = (state) => ({
  user: state.user,
  tradeHistory: state.userTradeHistory.data,
  tradeHistoryFilteredSorted: selectTradeHistoryFilteredSorted(state),
  activeSortBy: selectTradeHistorySortBy(state),
  promiseLoading: state.user.promise.isLoading,
  promiseError: state.user.promise.hasError,
  promiseSuccess: state.user.promise.isSuccess  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
