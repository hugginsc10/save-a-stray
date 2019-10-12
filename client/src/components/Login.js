import React, { Component } from "react";
import {
  Mutation,
  ApolloConsumer
} from "react-apollo";
import Facebook from "./FBButton";
import Google from "./GoogleLogin";
import Mutations from "../graphql/mutations";
import './auth.css';
import { Link, withRouter } from 'react-router-dom';
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
      data: { ...data.login}
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
              localStorage.setItem("auth-token", token)
              localStorage.setItem("user-id", _id);
              this.props.history.push("/")
            }}
            update={(client, data) => this.updateCache(client, data)}
          >
            {loginUser => (

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
                  }).catch(e => {
                    const login = document.getElementById("login-errors");
                    login.innterHTML = "";
                    const div = document.getElementById("errors");
                    let m = e.message.toString().slice(15);
                    console.log(m)
                })
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
                
                <Facebook/>
                <Google />
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