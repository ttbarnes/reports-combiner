import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  postTradeHistoryFormNote,
  tradeHistoryActiveTradeReset
} from '../../actions/userTradeHistory'
import { closeSidebar } from '../../actions/sidebar';
import { FORM_TRADE_HISTORY_ADD_NOTE } from '../../constants';

const TextArea = (props) => (
  <textarea
    value={props.input.value}
    onChange={props.input.onChange}
    autoFocus
  />
);

export class TradeHistoryAddNoteForm extends PureComponent {

  componentWillUnmount() {
    this.props.onResetTradeHistoryActiveTrade();
  }

  render() {
    const {
      onSubmitForm,
      promiseLoading,
      promiseSuccess
    } = this.props;

    return (
      <div className="trade-history-add-note-form">

        {!promiseSuccess &&
          <div>
            <form onSubmit={(e) => e.preventDefault()}>

              <div>
                <Field
                  name="note"
                  type="text"
                  component={TextArea}
                />
              </div>

              <div>
                <button
                  type="submit"
                  onClick={onSubmitForm}
                  className="block small"
                  disabled={promiseLoading}
                >Add note
                </button>
              </div>

            </form>
          </div>
        }
        {promiseSuccess &&
          <div>
            <p>Success!</p>
          </div>
        }
      </div>
    );
  }
}

const TradeHistoryAddNoteReduxForm = reduxForm({
  form: FORM_TRADE_HISTORY_ADD_NOTE
})(TradeHistoryAddNoteForm);

const mapStateToProps = (state) => ({
  promiseLoading: state.sidebar.promise.isLoading,
  initialValues: {
    note: state.userTradeHistory.activeTrade.note
  }
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitForm: () => dispatch(postTradeHistoryFormNote()),
  onCloseSidebar: () => dispatch(closeSidebar()),
  onResetTradeHistoryActiveTrade: () => dispatch(tradeHistoryActiveTradeReset())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TradeHistoryAddNoteReduxForm);
