import React from "react";
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import AuthRoute from '../util/route_util'
import Nav from "./Nav";
import './App.css'
const App = () => {
  return (
    <HashRouter>
      <div id='root-div1'>
        <h1 id='logo'>Save a Stray</h1>
        <Nav />
        <Switch>
          <AuthRoute exact path="/register" component={Register} routeType="auth" />
          <AuthRoute exact path="/login" component={Login} routeType="auth" />
          <Route path="/"  />
        </Switch>
      </div>
    </HashRouter>
  );
};

export default App;