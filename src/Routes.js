import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Header from './Header';
import Landing from './Landing';
import Login from './Login';
import Summary from './Summary';
import About from './About';
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
          pathname: '/summary',
          state: { from: props.location }
        }} />
    ) : (
      <Component {...props} />
      )
  )} />
);

class Router extends Component {
  render() {
    const { isAuth } = this.props;
    return (
      <BrowserRouter>
        <div>

          <Header />

          <div className="main-container">
            <Switch>
              <UnAuthRoute exact path="/" component={Landing} isAuth={isAuth} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute path="/summary" component={Summary} isAuth={isAuth} />
              <Route path="/about" component={About} />
            </Switch>
          </div>

        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth
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

