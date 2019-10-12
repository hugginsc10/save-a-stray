import React, { Component } from "react";
import { Mutation,ApolloConsumer } from "react-apollo";
import Facebook from "./FBButton";
import Mutations from "../graphql/mutations"
import './auth.css'
import { Link, withRouter } from 'react-router-dom';
import Google from "./GoogleLogin";
const { REGISTER_USER } = Mutations

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      data: {  isLoggedIn: data.register.loggedIn}
    });
  }

  render() {
    return (

      <ApolloConsumer>
        {client => (
          <Mutation
            mutation={REGISTER_USER}
            onCompleted={data => {
              const { token, _id } = data.register;
              localStorage.setItem("auth-token", token);
              localStorage.setItem("user-id", _id);
              this.props.history.push("/")
            }}
            update={(client, data) => this.updateCache(client, data)}
          >
            {registerUser => (

          <div className='auth-modal'>
            <div className='auth-div'>
            <Link to="/" className='modal-exit'>X</Link>   
              <form className='auth-form'
                onSubmit={e => {
                  e.preventDefault();
                  registerUser({
                    variables: {
                      name: this.state.name,
                      email: this.state.email,
                      password: this.state.password
                    }
                  }).catch(e => {
                    const login = document.getElementById("login-errors");
    
                    const div = document.getElementById("errors");
                    let m = e.message.toString().slice(15);
                    console.log(m);
                  })
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
                    <Facebook/>
                    <Google />
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
export default withRouter(Register);