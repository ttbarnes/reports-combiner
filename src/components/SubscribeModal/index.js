import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import { toggleSubSubscriptionModal } from '../../actions'

class SubscribeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: true
    }
  }

  handleOnClose = () => {
    this.setState({
      modalIsOpen: false
    });
    this.props.onCloseModal();
  };

  render() {
    const { modalIsOpen } = this.state;

    return (
      <Modal
        isOpen={modalIsOpen}
        onClose={this.handleOnClose}
      >
        <h1>Premium subscription required</h1>
        <p>Register for premium to get:</p>
        <ul>
          <li>Unlimated exchanges</li>
          <li>Unlimated CSV/PDF rows</li>
          <li>Add notes</li>
          <li>Statistics</li>
          <li>Etc</li>
        </ul>
        <button>Subscribe today</button>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  onCloseModal: () => toggleSubSubscriptionModal()
}

export default connect(
  null,
  mapDispatchToProps
)(SubscribeModal);
