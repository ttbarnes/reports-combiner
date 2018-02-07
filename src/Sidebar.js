import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeSidebar } from './actions/sidebar';

class Sidebar extends Component {
  render() {
    const {
      settings,
      onClose
    } = this.props;
    const isActive = settings.active;

    return (
      
      <div className={isActive ? 'sidebar active' : 'sidebar'}>
        <div className="sidebar-overlay" onClick={onClose} />


        <div className="sidebar-container">

          <header>
            <h3 className="heading-with-bg">{settings.context}</h3>
            <button onClick={onClose} className="button-link close">
              <i className="lnr lnr-cross" />
            </button>
          </header>

          <div>
            {settings.context === 'ADD_NOTE' &&
              <div>
                <p>Adding a note to ABCDEF1234567</p>
              </div>
            }
          </div>

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.sidebar
});

const mapDispatchToProps = {
  onClose: () => closeSidebar()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
