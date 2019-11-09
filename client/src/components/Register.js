import React, { Component } from "react";
import { Mutation, ApolloConsumer } from "react-apollo";
import Mutations from "../graphql/mutations"
<<<<<<< HEAD
import './auth.css'
import RaisedButton from 'material-ui/RaisedButton';
=======
import './css/auth.css'
>>>>>>> d2368c76eb1f9ef1aad04ceef80490ce8596c372
import { Link } from 'react-router-dom';
const { REGISTER_USER } = Mutations

let baseUrl = `Https://save-a-stray.herokuapp.com`;

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
            <Link to="/"className='modal-exit' >X</Link>   

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
                <div id='shelter-signup-wrapper'>
                  <p id='preShelter'>If you are a shelter  </p> 
                  &nbsp;
                  <Link to="/newShelter"> click here</Link>
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
<<<<<<< HEAD
                <div className="modal-twitter-button">
                <RaisedButton
                  href={`${baseUrl}/auth/twitter`}
                  backgroundColor="#1da1f2"
                  labelColor="#ffffff"
                  label="Log in with Twitter"
                />
              </div>

              <div className="modal-amazon-button">
                <RaisedButton
                  href={`${baseUrl}/auth/amazon`}
                  backgroundColor="#1da1f2"
                  labelColor="#ffffff"
                  label="Log in with Amazon"
                />
              </div>

              <div className="modal-google-button">
                <RaisedButton
                  href={`${baseUrl}/auth/google`}
                  backgroundColor="#1da1f2"
                  labelColor="#ffffff"
                  label="Log in with Google"
                />
              </div>

              <div className="modal-facebook-button">
                <RaisedButton
                  href={`${baseUrl}/auth/facebook`}
                  backgroundColor="#1da1f2"
                  labelColor="#ffffff"
                  label="Log in with Facebook"
                />
              </div>
  
=======
>>>>>>> d2368c76eb1f9ef1aad04ceef80490ce8596c372
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