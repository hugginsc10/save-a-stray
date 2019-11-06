import React, { Component } from "react";
import {
  Mutation,
  ApolloConsumer,
  Query
} from "react-apollo";
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
   this.handleDemo = this.handleDemo.bind(this);
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
              const { token, _id } = data.login;
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
                        <FacebookLogin />
                        <button id='google-button' className="g-signin2 modal-button" data-onsuccess="onSignIn">Sign in with Google</button>
                      </form>
                      
                    </div>
                  </div>
        );
        }}
        </Mutation>
    );
  }
}
export default withRouter(Login);
