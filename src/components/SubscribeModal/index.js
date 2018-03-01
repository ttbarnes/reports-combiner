import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import Loading from '../Loading';
import { userUpdate } from '../../actions/user'
import { hideSubSubscriptionModal } from '../../actions/uiState';
import { Step1, Step2, Step3 } from './steps';

export class SubscribeModal extends Component {
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
          <Step1 onButtonClick={this.handlePayment} />
        }
        {step === 2 &&
          <Step2 onButtonClick={this.handlePayment} />
        }
        {(step === 3 && promiseSuccess) &&
          <Step3 />
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
