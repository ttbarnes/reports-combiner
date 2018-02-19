import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { postTradeHistoryFormNote } from '../../actions/userTradeHistory'
import { closeSidebar } from '../../actions/sidebar';

const TextArea = (props) => (
  <textarea
    value={props.input.value}
    onChange={props.input.onChange}
  />
);

export class TradeHistoryAddNoteForm extends PureComponent {
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
  form: 'TRADE_HISTORY_ADD_NOTE'
})(TradeHistoryAddNoteForm);

const mapStateToProps = (state) => ({
  promiseLoading: state.sidebar.promise.isLoading,
  initialValues: {
    note: state.userTradeHistory.activeRow.note
  }
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitForm: () => dispatch(postTradeHistoryFormNote()),
  onCloseSidebar: () => dispatch(closeSidebar())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TradeHistoryAddNoteReduxForm);
