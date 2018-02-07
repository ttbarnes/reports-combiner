import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { POSSIBLE_EXCHANGES } from '../constants';
import IntegrationsCount from '../components/IntegrationsCount';

export class Dashboard extends PureComponent {

  render() {
    const { user } = this.props;

    return (
      <div>

        <div className="align-center">
          {user.username && <h2><span className="text-transform-capitalize">{user.username}</span>{'\''}s Dashboard</h2>}
          {!user.subscription && <p className="account-tag basic"><small>Basic account</small></p>}
          {user.subscription && <p className="account-tag premium"><small>Premium account</small></p>}

          <IntegrationsCount
            integrations={user.keys}
            totalCount={POSSIBLE_EXCHANGES.length}
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

export default connect(
  mapStateToProps,
  null
)(Dashboard);

