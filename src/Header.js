import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authCheck, logout } from './actions/user';

export class Header extends Component {
  componentWillMount() {
    this.props.doAuthCheck();
  }

  render() {
    const {
      isAuth,
      doLogout
    } = this.props;

    return (
      <header>
        <div className="logo">
          <h1 className="heading-with-bg">
            <Link to="/">Reports Combiner</Link>
          </h1>
        </div>
        <div className="nav">
          {isAuth ?
            <ul>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/integrations">Integrations</Link></li>
              <li><Link to="/history">History</Link></li>
              <li><button className="button-link" onClick={doLogout}>Logout</button></li>
            </ul>
            :
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign up</Link></li>
            </ul>
          }
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth
});

const mapDispatchToProps = {
  doAuthCheck: () => authCheck(),
  doLogout: () => logout()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
