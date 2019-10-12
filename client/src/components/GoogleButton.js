import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';

class Google extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      name: "",
      email: ""
    };
}
  responseGoogle = (response) => {
    this.setState({
      isLoggedIn: true,
      email: response.email,
      name: response.name,
    })
    console.log(response)
}
componentClicked = () => console.log("clicked");

render() {
  let googleContent;
  if (this.state.isLoggedIn){
    googleContent = (
      console.log("signed in")
    )
  } else {
    googleContent = (
      <GoogleLogin
        clientId="635738163475-o9l4j887ciaq0ieaml6h8tiqn8hmk5ce.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      /> ,
      document.getElementById('googleButton')
    )
  }
}
};

