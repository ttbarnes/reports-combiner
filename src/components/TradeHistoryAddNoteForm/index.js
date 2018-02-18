import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { postTradeHistoryFormNote } from '../../actions/userTradeHistory'
import './styles.css';
import { closeSidebar } from '../../actions/sidebar';

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
          <form onSubmit={(e) => e.preventDefault()}>

            <div>
              <Field
                name="note"
                component="textarea"
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
        }
        {promiseSuccess &&
          <div>
            <p>Successfully added note!</p>
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
  promiseLoading: state.sidebar.promise.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitForm: () => dispatch(postTradeHistoryFormNote()),
  onCloseSidebar: () => dispatch(closeSidebar())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TradeHistoryAddNoteReduxForm);
