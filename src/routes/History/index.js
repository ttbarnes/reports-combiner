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
import {
  SIDEBAR_TRADE_HISTORY_ADD_NOTE,
  FILTERS_TIMESTAMP_ASCENDING
} from '../../constants';
import './styles.css';

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
    this.props.onSetTradeHistorySortBy(FILTERS_TIMESTAMP_ASCENDING);
  }

  componentWillUnmount() {
    this.props.onResetTradeHistoryActiveTrade();
    this.props.onResetTradeHistoryFilterBySortBy();
  }

  handleOnAddNote = (rowObj) => {
    this.props.onTradeHistoryActiveTrade(rowObj);
    this.props.onOpenAddNoteSidebar();
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
            <p><Link to="/integrations">Add some exchanges</Link> to view your history</p>
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
          <div className="history-filters-table-container">

            <TradeHistoryFilters
              onSetFilterBy={onSetTradeHistoryFilterBy}
              exchangeNames={exchangesIntegrated}
            />

            <TradeHistoryTable
              tradeHistory={tradeHistory}
              tradeHistoryFilteredSorted={tradeHistoryFilteredSorted}
              onClickAddNoteButton={this.handleOnAddNote}
              activeSortBy={activeSortBy}
              onSetSortBy={onSetTradeHistorySortBy}
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
