import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  closeSidebar,
  promiseSidebarReset
} from '../../actions/sidebar';
import { SIDEBAR_TRADE_HISTORY_ADD_NOTE } from '../../constants';
import Loading from '../Loading';
import TradeHistoryAddNoteForm from '../../components/TradeHistoryAddNoteForm';

class Sidebar extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.promiseSuccess !== this.props.promiseSuccess) {
      setTimeout(() => {
        this.props.onClose();
        this.props.onResetPromise();
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
      promiseSuccess
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
  promiseError: state.sidebar.promise.hasError
});

const mapDispatchToProps = {
  onClose: () => closeSidebar(),
  onResetPromise: () => promiseSidebarReset()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
