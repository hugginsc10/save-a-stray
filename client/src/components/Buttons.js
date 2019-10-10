import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';


let baseUrl = "";
class SocialButtons extends React.Component {
  
  render() {
    return (
     <div className="modal-social-button-parent">
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
    </div> 
    
    )
  }
}
export default SocialButtons;