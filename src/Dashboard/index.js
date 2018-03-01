import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { EXCHANGES_MAP } from '../constants';
import IntegrationsCount from '../components/IntegrationsCount';
import { showSubSubscriptionModal } from '../actions/uiState';
import './styles.css';

export class Dashboard extends PureComponent {

  render() {
    const {
      user,
      onShowSubSubscriptionModal
    } = this.props;

    return (
      <div className="dashboard-container">

        <div>
          {user.username && <h2><span className="text-transform-capitalize">{user.username}</span>{'\''}s Dashboard</h2>}
          {!user.subscription && <p className="account-tag basic">Basic account</p>}
          {user.subscription && <p className="account-tag premium">Premium account</p>}

          <button
            className="button-as-link"
            onClick={onShowSubSubscriptionModal}
          >
            Upgrade to premium
          </button>

          <IntegrationsCount
            integrations={user.keys}
            totalCount={EXCHANGES_MAP.length}
            showCta
          />

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.profile
  }
}

const mapDispatchToProps = {
  onShowSubSubscriptionModal: () => showSubSubscriptionModal()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

