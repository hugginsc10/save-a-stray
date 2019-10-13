import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
class FbLoginBtn extends Component {
  constructor(props) {
    super(props);
    // post login behavior should be defined at a higher level
    this.onSuccess = this.props.onSuccess || (() => { });
    this.onFailure = this.props.onFailure || (() => { });
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }
  componentDidMount() {
    // This is the meat of the component
    // create a script tag, load FB SDK
    // then after script is loaded, set related behavior
    // If you have other components that rely on the FB SDK
    // I recommend extracting this into its own module
    let self = this;
    let scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=515957642529597";
    scriptTag.addEventListener('load', function (e) {
      self.FB = window.FB;
      // I don't like exposing the SDK to global scope
      window.FB = null;
      // This subscribe the callback when login status change
      // Full list of events is here
      // https://developers.facebook.com/docs/reference/javascript/FB.Event.subscribe/v2.9
      self.FB.Event.subscribe('auth.statusChange', self.onStatusChange.bind(self));
    });
    document.body.appendChild(scriptTag);
  }
  onStatusChange(response) {
    if (response.status === 'connected') {
      const { accessToken } = response.authResponse;
      
      this.onSuccess(accessToken, this.props.afterLogin);
  
    } else {
      this.onFailure();
    }
  }
  render() {
    return (
      <div
        className="fb-login-button"
        data-width={this.props.width}
        data-max-rows="1"
        data-size="large"
        data-button-type="login_with"
        data-show-faces="false"
        data-auto-logout-link="true"
        data-use-continue-as="true"
        data-scope={this.props.dataScope}
      >
      </div>
    );
  }
}
export default withRouter(FbLoginBtn);