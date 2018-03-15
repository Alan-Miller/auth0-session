import React, { Component } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { Switch, Route } from 'react-router-dom';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route component={Login} exact path="/" />
          <Route component={Dashboard} path="/dashboard" />
        </Switch>
      </div>
    )
  }
}