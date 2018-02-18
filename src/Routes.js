import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import History from './History';
import Integrations from './Integrations';
import About from './About';
import SubscribeModal from './components/SubscribeModal';
import Sidebar from './components/Sidebar';
import './App.css';

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route {...rest} render={props => (
    isAuth ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
  )} />
);

const UnAuthRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route {...rest} render={props => (
    isAuth ? (
      <Redirect to={{
          pathname: '/history',
          state: { from: props.location }
        }} />
    ) : (
      <Component {...props} />
      )
  )} />
);

class Router extends Component {
  render() {
    const {
      isAuth,
      showSubscriptionModal
    } = this.props;

    return (
      <BrowserRouter>
        <div>

          <Header />

          <div className="main-container">
            <Switch>
              <UnAuthRoute exact path="/" component={Landing} isAuth={isAuth} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <PrivateRoute path="/dashboard" component={Dashboard} isAuth={isAuth} />
              <PrivateRoute path="/integrations" component={Integrations} isAuth={isAuth} />
              <PrivateRoute path="/history" component={History} isAuth={isAuth} />
              <Route path="/about" component={About} />
            </Switch>
          </div>

          {showSubscriptionModal && <SubscribeModal />}

          <Sidebar />

        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth,
  showSubscriptionModal: state.uiState.subscriptionModal.show
})

const ConnectedRouter = connect(
  mapStateToProps,
  null
)(Router);

const Routes = ({ store }) => (
  <Provider store={store}>
    <ConnectedRouter />
  </Provider>
);

Routes.propTypes = {
  store: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Routes;

