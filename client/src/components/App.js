import React from "react";
import { HashRouter, Switch, Route } from 'react-router-dom';
import Splash from './Splash'
import Login from "./Login";
import Register from "./Register";
import RegisterShelter from "./RegisterShelter";
import Animal from "./Animal";
import AnimalShow from "./AnimalShow";
import Application from "./Application";
import Shelter from "./Shelter";
import ShelterLanding from "./ShelterLanding";
import Landing from "./Landing";
import UserLanding from "./UserLanding";
import AuthRoute from '../util/route_util'
import Nav from "./Nav";
import Slug from './slug'
import './css/App.css'
import Privacy from "./Privacy";
import TermsOfService from "./TermsOfService";
const App = () => {
  return (
    <HashRouter>
      <div id='root-div1'>
        <Slug/>
        <Nav id='navbar' />
          <Route exact path="/newAnimal" component={Animal} routeType=""  />
          <Route exact path="/RegisterShelter/:id" component={RegisterShelter} routeType=""  />
          <Route exact path="/AnimalShow/:id" component={AnimalShow} routeType=""  />
          <Route exact path="/Landing" component={Landing} routeType=""  />
          <Route exact path="/User" component={UserLanding} routeType=""  />
          <Route exact path="/Shelter" component={ShelterLanding} routeType=""  />
          <Route exact path="/newApplication" component={Application}  routeType="" />

        <Switch>
          <Route exact path='/' component={Splash} />
          <Route exact path="/newShelter" component={Shelter} routeType="auth" />
          <AuthRoute exact path="/register" component={Register} routeType="auth" />
          <AuthRoute exact path="/login" component={Login} routeType="auth" />
          <Route exact path="/privacy" component ={Privacy} />
          <Route exact path="/tos" component={TermsOfService} />
        </Switch>
      </div>
    </HashRouter>
  );
};

export default App;