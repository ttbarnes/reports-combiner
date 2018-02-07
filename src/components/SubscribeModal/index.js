import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import Loading from '../Loading';
import { userUpdate } from '../../actions/user'
import { hideSubSubscriptionModal } from '../../actions/uiState';

class SubscribeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: true,
      step: 1
    }
  }

  handleOnClose = () => {
    this.setState({
      modalIsOpen: false,
      step: 1
    });
    this.props.onCloseModal();
  };

  handleStepChange = () => {
    this.setState({
      step: this.state.step + 1
    });
  }

  handlePayment = () => {
    this.props.onSubmitPayment();
    this.handleStepChange();
  }

  render() {
    const {
      modalIsOpen,
      step
    } = this.state;

    const { 
      promiseLoading,
      promiseSuccess,
      promiseError
    } = this.props;

    return (
      <Modal
        isOpen={modalIsOpen}
        onClose={this.handleOnClose}
      >
      {step === 1 &&
        <div className="align-center">
          <h1>Premium subscription required</h1>
          <p>Register for premium to get:</p>
          <ul>
            <li>Unlimated exchanges</li>
            <li>Unlimated CSV/PDF rows</li>
            <li>Add notes</li>
            <li>Statistics</li>
            <li>Etc</li>
          </ul>
          <button onClick={this.handleStepChange}>Subscribe today</button>
        </div>
      }
      {step === 2 &&
        <div className="align-center">
          <h1>Premium subscription</h1>
          <p>£1.23 p/month</p>

          <button onClick={this.handlePayment}>Mock send payment</button>
        </div>
      }
      {(step === 3 && promiseSuccess) &&
        <div className="align-center">
          <h1>Thank you</h1>
          <p>We hope you enjoy! :)</p>
        </div>
      }
 
      {promiseLoading &&
        <Loading />
      }
      {promiseError &&
        <p className="form-error">Sorry, something has gone wrong :(</p>
      }
        
      </Modal>
    )
  }
}
const mapStateToProps = (state) => ({
  promiseLoading: state.user.promise.isLoading,
  promiseError: state.user.promise.hasError,
  promiseSuccess: state.user.promise.isSuccess
})

const mapDispatchToProps = {
  onCloseModal: () => hideSubSubscriptionModal(),
  onSubmitPayment: () => userUpdate()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscribeModal);
