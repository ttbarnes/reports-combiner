import React, { PureComponent } from 'react';
import ReactModal from 'react-modal';
import './styles.css'

export class Modal extends PureComponent {

  componentWillMount() {
    ReactModal.setAppElement('#root');
  }

  render() {
    const {
      isOpen,
      onClose,
      children
    } = this.props;

    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Modal"
        className={{
          base: 'modal-container',
          afterOpen: 'modal-container-after-open',
          beforeClose: 'modal-container-before-open',
        }}
        overlayClassName={{
          base: 'modal-overlay',
          afterOpen: 'modal-overlay-after-open',
          beforeClose: 'modal-overlay-before-close'
        }}
      >
        <div className="modal-content">

          <div className="modal-content-inner">

            {children}

          </div>

          <button onClick={onClose} className="modal-close-button">
            <span className="lnr lnr-cross" />
          </button>

        </div>
      </ReactModal>
    );
  }
}

export default Modal;
