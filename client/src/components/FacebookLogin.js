import React, {
  Component
} from 'react';
import querystring from 'querystring';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";

class FacebookSignIn extends Component {
  constructor(props) {
    super(props);
    this.onFacebookLogin = this.onFacebookLogin.bind(this);
    this.appId = '515957642529597';
    this.redirectUrl = `${document.location.protocol}//${document.location.host}/auth/facebook/callback`;
    // this.redirectUrl = `${document.location.protocol}//save-a-stray.herokuapp.com/auth/facebook/callback`;

    if (document.location.pathname === '/') {
      this.code = querystring.parse(document.location.search)['?code'];
    }

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    if (!this.code) {
      return;
    }

    this.setState({
      loading: true
    });
    this.props.mutate({
      variables: {
        code: this.code
      }
    }).then(response => {
      this.setState({
        loading: false
      });
      const {error, user, session } = response.data.facebookSignIn;
      if (error) {
        alert('sign in error: ', error);
      } else {
        alert('sign in success, your token: ', session.token);
      }
    }).catch(e => {
        alert('backend error:', e.toString(), 
        this.setState({
            loading: false
          })
        );
    })
  }

    onFacebookLogin(event) {
      event.preventDefault();
      // window.location = `https://save-a-stray.herokuapp.com/auth/facebook`;
      window.location = `https://localhost:3000/auth/facebook/callback`;
    }

    render() {
      const {
        loading
      } = this.state;
      const icon = 'fa ' + (loading ? 'fa-refresh fa-spin' : 'fa-facebook');

<<<<<<< HEAD
      return ( 
      <a href = '/auth/facebook' onClick={this.onFacebookLogin}> 
        <i className = {icon}> </i> 
        Facebook 
      </a>
=======
      return (<a className='modal-button' id='facebook-button' href = '/facebooklogin'
        onClick = {this.onFacebookLogin}> 
        <i className = {icon} > 
        </i> Sign in with Facebook </a >
>>>>>>> d2368c76eb1f9ef1aad04ceef80490ce8596c372
      );
    }
  }

  export default graphql(gql `
  mutation facebookSignIn($code: String!) {
    facebookSignIn(code: $code) {
      user {
        id
        email
        name
      }
      session {
        token
      }
    }
  } 
`)(FacebookSignIn);