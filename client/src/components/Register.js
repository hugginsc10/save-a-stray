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
    console.log(data);
    client.writeData({
      data: {  isLoggedIn: data.register.loggedIn,userRole: data.register.userRole }
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
              if (client.cache.data.data.ROOT_QUERY.userRole === "admin") {
                this.props.history.push("/Shelter");
              } else {
                this.props.history.push("/User")
                
              }
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
                      userRole: this.state.userRole,
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
                <select onChange={this.update("userRole")}>
                  <option value="admin">Admin</option>
                  <option value="endUser">Adopt</option>
                  <option value="volunteer">Volunteer</option>
                </select>
                <input
                  value={this.state.password}
                  onChange={this.update("password")}
                  type="password"
                  placeholder="Password"
                />
                <FacebookLogin />
                <button className='modal-button' type="submit">Register Account</button>
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