import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header';
import Landing from './Landing';
import Summary from './Summary';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">

          <Header />

          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/summary" component={Summary} />
          </Switch>

        </div>

      </BrowserRouter>
    );
  }
}

export default App;
