import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  closeSidebar,
  promiseSidebarReset
} from '../../actions/sidebar';
import {
  SIDEBAR_TRADE_HISTORY_ADD_NOTE,
  SIDEBAR_TRADE_HISTORY
} from '../../constants';
import Loading from '../Loading';
import TradeHistoryAddNoteForm from '../../components/TradeHistoryAddNoteForm';
import TradeHistoryTrade from '../../components/TradeHistoryTrade'

const ESC_KEY_CODE = 27;

class Sidebar extends Component {

  componentDidMount() {
    document.addEventListener('keyup', (ev) => {
      if (ev.keyCode === ESC_KEY_CODE) {
        this.handleOnClose();
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { promiseSuccess } = nextProps;
    // auto close sidebar (with delay) after promiseSuccess
    // probably a better way to do this
    if (promiseSuccess) {
      setTimeout(() => {
        if (this.props.promiseSuccess === true &&
            this.props.settings.active) {
          this.handleOnClose();
        }
      }, 3000);
    }
  }

  handleOnClose = () => {
    const { promiseLoading, promiseError, promiseSuccess, onResetPromise, onClose } = this.props;
    if (promiseSuccess || promiseError || promiseLoading) {
        onResetPromise(); 
    }
    onClose();
  }

  render() {
    const {
      settings,
      promiseLoading,
      promiseError,
      promiseSuccess,
      activeTrade
    } = this.props;
    const isActive = settings.active;

    return (
      
      <div className={isActive ? 'sidebar active' : 'sidebar'}>
        <div className="sidebar-overlay" onClick={this.handleOnClose} />


        <div className="sidebar-container">

          <header>
            <h3 className="heading-with-bg">
              {settings.context === SIDEBAR_TRADE_HISTORY_ADD_NOTE && 'Add Note'}
            </h3>
            <button onClick={this.handleOnClose} className="button-link close">
              <i className="lnr lnr-cross" />
            </button>
          </header>

          {promiseLoading &&
            <Loading />
          }

          {promiseError &&
            <p className="form-error">Sorry, something has gone wrong :(</p>
          }

          <div>
            {(settings.context === SIDEBAR_TRADE_HISTORY ||
              settings.context === SIDEBAR_TRADE_HISTORY_ADD_NOTE) &&
              <div>
                <TradeHistoryTrade
                  trade={activeTrade}
                />
              </div>
            }

            {settings.context === SIDEBAR_TRADE_HISTORY_ADD_NOTE &&
              <div>
                <TradeHistoryAddNoteForm
                  promiseSuccess={promiseSuccess}
                />
              </div>
            }

          </div>

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.sidebar,
  promiseLoading: state.sidebar.promise.isLoading,
  promiseSuccess: state.sidebar.promise.isSuccess,
  promiseError: state.sidebar.promise.hasError,
  activeTrade: state.userTradeHistory.activeTrade
});

const mapDispatchToProps = {
  onClose: () => closeSidebar(),
  onResetPromise: () => promiseSidebarReset()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
