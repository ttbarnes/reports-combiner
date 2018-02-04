import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header';
import Landing from './Landing';
import Login from './Login';
import Summary from './Summary';
import './App.css';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>

          <Header />

          <div className="main-container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/summary" component={Summary} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>

        </div>
      </BrowserRouter>
    );
  }
}

const Routes = ({ store }) => (
  <Provider store={store}>
    <Router />
  </Provider>
);

Routes.propTypes = {
  store: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Routes;

