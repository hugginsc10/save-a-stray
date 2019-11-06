import React, { Component } from "react";
import {
  Mutation,
  ApolloConsumer
} from "react-apollo";
import Mutations from "../graphql/mutations";
import './auth.css';
import { Link, withRouter } from 'react-router-dom';
import SocialButtons from './Buttons';
const { LOGIN_USER } = Mutations





class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }
  
  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }
  
  updateCache(client, {data}) {
    client.writeData({
      // data: { isLoggedIn: data.login.loggedIn,userRole: data.login.userRole }
      data: { ...data.login }
    });
  }  
  
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Mutation
            mutation={LOGIN_USER}
            onCompleted={data => {
              const { token, _id } = data.login;
              localStorage.setItem("auth-token", token);
              if (client.cache.data.data.ROOT_QUERY.userRole === "admin") {
                this.props.history.push("/Shelter");
              } else {
                this.props.history.push("/User")
              }
            }}
            update={(client, data) => this.updateCache(client, data)}
          >
            {loginUser => (

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
                <SocialButtons />
              
  
              </form>
              
            </div>
          </div>
        )}
        </Mutation>
        )}
      </ApolloConsumer>
    );
  }
}
export default withRouter(Login);