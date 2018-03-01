import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { EXCHANGES_MAP } from '../constants';
import IntegrationsCount from '../components/IntegrationsCount';
import { showSubSubscriptionModal } from '../actions/uiState';

export class Dashboard extends PureComponent {

  render() {
    const {
      user,
      onShowSubSubscriptionModal
    } = this.props;

    return (
      <div>

        <div>
          {user.username && <h2><span className="text-transform-capitalize">{user.username}</span>{'\''}s Dashboard</h2>}
          {!user.subscription && <p className="account-tag basic"><small>Basic account</small></p>}
          {user.subscription && <p className="account-tag premium"><small>Premium account</small></p>}

          <button
            className="button-link"
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

