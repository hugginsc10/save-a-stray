import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import {Redirect, withRouter} from 'react-router-dom'
class Facebook extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: "",

  };
} 
  responseFacebook = response => {
    // console.log(response);
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    });
  };
  componentClicked = () => console.log("clicked");
  render() {
    let fbContent;
    if (this.state.isLoggedIn) {
      fbContent = (
        <div
          style={{
            width: "400px",
            margin: "auto",
            background: "#f4f4f4",
            padding: "20px"
          }}
        >
          <img src={this.state.picture} alt={this.state.name} />
          <h2>Welcome {this.state.name}</h2>
          Email: {this.state.email}
        </div>
      );
    } else {
      fbContent = (
        <FacebookLogin
          appId="515957642529597"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
          redirectUri={"/"}
          returnScopes={true}
          cookie={true}
        />
       

      );
    }
    return (
    
       fbContent
    
    )
    
  }
}
export default withRouter(Facebook);