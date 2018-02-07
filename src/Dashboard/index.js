import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

export class Dashboard extends PureComponent {

  render() {
    const { user } = this.props;

    return (
      <div>

        <div className="align-center">
          {user.username && <h2><span className="text-transform-capitalize">{user.username}</span>{'\''}s Dashboard</h2>}
          {!user.subscription && <p className="account-tag basic"><small>Basic account</small></p>}
          {user.subscription && <p className="account-tag premium"><small>Premium account</small></p>}
          {user.keys && <p><small>{user.keys.length}/4 exchanges</small></p>}
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

