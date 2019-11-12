import React, { Component } from "react";
import { Mutation,ApolloConsumer } from "react-apollo";
import Mutations from "../graphql/mutations"
import './css/auth.css'
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
                debugger
              const { token } = data.register;
              localStorage.setItem("auth-token", token);
              this.props.history.push("/Landing");
            }}
            update={(client, data) => this.updateCache(client, data)}
          >
            {registerUser => (

          <div className='auth-modal'>
            <div className='auth-div'>
            <Link to="/"className='modal-exit' >X</Link>   
              <form className='auth-form'
                onSubmit={e => {
                  e.preventDefault();
                  registerUser({
                    variables: {
                      shelterId: this.props.match.params.id,
                      name: this.state.name,
                      userRole: 'shelter',
                      email: this.state.email,
                      password: this.state.password
                    }
                  });
                }}
              >
                <h1>Admin</h1>
                <h1>User</h1>
                <div id='shelter-signup-wrapper'>
                </div>
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
                <pre id='legal'>By clicking "Sign Up" I agree to the Save A Stray  
                  <br/> 
                   <a href='#/tos'>Terms of Service</a>
                   <pre> </pre>
                   <a href='#/privacy'>Privacy Policy</a>
                </pre>
              </form>
            </div>
            
            
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