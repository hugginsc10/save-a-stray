import React, { Component } from "react";
import {
  Mutation,
  ApolloConsumer,
  Query
} from "react-apollo";
import FacebookLogin from "./FacebookLogin";
import Mutations from "../graphql/mutations";
import Querys from "../graphql/queries";
import './css/auth.css';
import { Link, withRouter } from 'react-router-dom';
import ShelterLanding from "./ShelterLanding" ;
const { LOGIN_USER } = Mutations;
const { FETCH_USER,USER_ID} = Querys;
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }
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
  
  render() { 
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
                let message= "";
                if (error) {
                  message = error.graphQLErrors[0].message
                }
                // if (error) return <p>Error</p>;
                return (

                  <div className='auth-modal'>
                    <div className='auth-div'>
                    <Link to="/" className='modal-exit' >X</Link> 
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
                        <h2 className="auth-err">{message}</h2>
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
                        {/* <FacebookLogin />
                        <button id='google-button' className="g-signin2 modal-button" data-onsuccess="onSignIn">Sign in with Google</button> mark rfq */}
                        <pre id='legal'> 
                          <div className="nav-user-auth-login">
                              dont have an account? &nbsp;
                              <Link to="/register">click here sign up.</Link>
                          </div>
                        </pre>
                      </form>

                      <form className='auth-form'
                        onSubmit={e => {
                          e.preventDefault();
                          loginUser({
                            variables: {
                              email: "demo@demo.com",
                              password: "hunter12"
                            }
                          });
                        }}
                      >
                      
                        <button className='modal-button' type="submit">DEMO</button>
                      </form>  


                      
                    </div>
                  </div>
        );
        }}
        </Mutation>
    );
  }
}
export default Login;
