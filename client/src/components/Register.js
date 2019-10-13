import React, { Component } from "react";
import { Mutation,ApolloConsumer } from "react-apollo";
import FacebookLogin from "./FacebookLogin";
import Mutations from "../graphql/mutations"
import './auth.css'
import { Link } from 'react-router-dom';
const { REGISTER_USER } = Mutations


class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: "",
      name: "",
      email: "",
      password: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    debugger
    client.writeData({
      data: {  isLoggedIn: data.register.loggedIn,userId: data.register._id }
    });
  }

  render() {
    return (

      <ApolloConsumer>
        {client => (
          <Mutation
            mutation={REGISTER_USER}
            onCompleted={data => {
              const { token } = data.register;
              localStorage.setItem("auth-token", token);
              this.props.history.push("/Landing");
            }}
            update={(client, data) => this.updateCache(client, data)}
          >
            {registerUser => (

          <div className='auth-modal'>
            <div className='auth-div'>
            <Link className='modal-exit' to="/">X</Link>   
              <form className='auth-form'
                onSubmit={e => {
                  e.preventDefault();
                  registerUser({
                    variables: {
                      name: this.state.name,
                      userRole: 'endUser',
                      email: this.state.email,
                      password: this.state.password
                    }
                  });
                }}
              >
                <h1>Signup</h1>
                <input
                  value={this.state.name}
                  onChange={this.update("name")}
                  placeholder="name"
                />
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
                <button className='modal-button' type="submit">Register Account</button>
                <FacebookLogin />
                <pre id='legal'>By clicking "Sign Up" I agree to the Save A Stray  
                  <br/> 
                   <a href='#/tos'>Terms of Service</a>
                   <pre> </pre>
                   <a href='#/privacy'>Privacy Policy</a>
                </pre>
              </form>
            </div>
            
            <Link to="/newShelter">New Shelter</Link>
            <br />
          </div>
       
        )}
        </Mutation>
        )}
      </ApolloConsumer>
    );
  }
}
export default Register;