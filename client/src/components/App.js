import React from "react";
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import Animal from "./Animal";
import Application from "./Application";
import Shelter from "./Shelter";
import AuthRoute from '../util/route_util'
import Nav from "./Nav";

const App = () => {
  return (
    <HashRouter>
      <div>
        <Nav />
        <h1>Save a Stray</h1>
          <Route exact path="/newAnimal" component={Animal} routeType=""  />
          <Route exact path="/newApplication" component={Application}  routeType="" />
        <Switch>
          <Route exact path="/newShelter" component={Shelter} routeType="auth" />
          <AuthRoute exact path="/register" component={Register} routeType="auth" />
          <AuthRoute exact path="/login" component={Login} routeType="auth" />
        </Switch>
      </div>
    </HashRouter>
  );
};

export default App;