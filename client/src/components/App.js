import React from "react";
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import AuthRoute from '../util/route_util'
import Nav from "./Nav";

const App = () => {
  return (
    <HashRouter>
      <div>
        <Nav />
        <h1>Save a Stray</h1>
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