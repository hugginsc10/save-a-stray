import React from "react";
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import Animal from "./Animal";
import Application from "./Application";
import Shelter from "./Shelter";
import AuthRoute from '../util/route_util'
import Nav from "./Nav";
import './App.css'
const App = () => {
  return (
    <HashRouter>
      <div id='root-div1'>
        <h1 id='logo'>Save a Stray</h1>
        <Nav />
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