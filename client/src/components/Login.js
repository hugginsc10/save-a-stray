import React, { Component } from "react";
import {
  Mutation,
  ApolloConsumer,
  Query
} from "react-apollo";
import axios from 'axios';//npm install axios if err

import Mutations from "../graphql/mutations";
import Querys from "../graphql/queries";
import './auth.css';
import { Link, withRouter } from 'react-router-dom';
import ShelterLanding from "./ShelterLanding" ;
const { LOGIN_USER } = Mutations;
const { FETCH_USER,USER_ID} = Querys;
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loading:false
    };
    this.faceBookLogin = this.faceBookLogin.bind(this)
  }
  // facebookLogin = () => {
  //   window.location = "https://localhost:3000/auth/facebook"
  //   console.log("successful login")
  // }
  onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  };
  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }
  
  updateCache(client, {data}) {
    client.writeData({
      data: { isLoggedIn: data.login.loggedIn,userId: data.login._id }
    });
  }

  faceBookLogin(){
    return axios.get('https://save-a-stray.herokuapp.com/facebooklogin').then(user => {
      debugger
    })
  }
  
  render() { 
    //  rfq after working 
    const {
      loading
    } = this.state;
    const icon = 'fa ' + (loading ? 'fa-refresh fa-spin' : 'fa-facebook');
    //  rfq after working 

    return (
      
        <Mutation
            mutation={LOGIN_USER}
            onCompleted={data => {
              const { token } = data.login;
              localStorage.setItem("auth-token", token);
              this.props.history.push("/Landing");
            }}
            update={(client, data) => this.updateCache(client, data)}
          >
            {( loginUser,{ loading, error, data }) => {
                if (loading) return <p>Loading</p>;
                if (error) return <p>Error</p>;
                return (

              <div className='auth-modal'>
                <div className='auth-div'>
                  <Link to="/" className='modal-exit'>X</Link>
                  <form className='auth-form'
                    onSubmit={e => {
                      e.preventDefault();
                      loginUser({
                        variables: {
                          email: this.state.email,
                          password: this.state.password
                        }
                      });
                    }}
                  >
                    <h1>Login</h1>
                    <input
                      value={this.state.email}
                      onChange={this.update("email")}
                      placeholder="Email"
                    />
                    <input
                      value={this.state.password}
                      onChange={this.update("password")}
                      type="password"
                      placeholder="Password"
                    />
                    <button className='modal-button' type="submit">Log In</button>
                    
                  
                  </form>
                  {/* rfq after working  */}
                      <a className='modal-button' id='facebook-button' 
                        onClick={this.faceBookLogin}>
                        <i className={icon} >
                        </i> Sign in with Facebook </a >
                  {/* rfq after working  */}
                </div>
              </div>
                )}}
          </Mutation>
    );
  }
}
export default Login;
