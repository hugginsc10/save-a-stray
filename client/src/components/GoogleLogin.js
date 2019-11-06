import React from 'react';
import querystring from 'querystring';
import {graphql} from 'react-apollo';
import gql from "graphql-tag";




class GoogleSignIn extends React.Component {
  constructor(props) {
    super(props);
    this.onGoogleLogin = this.onGoogleLogin.bind(this);
    this.appId = "635738163475-o9l4j887ciaq0ieaml6h8tiqn8hmk5ce.apps.googleusercontent.com";
    this.redirectUrl = `${document.location.protocol}//${document.location.host}/google-callback`;


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
      const {
        error,
        user,
        session
      } = response.data.googleSignIn;
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

  onGoogleLogin(event) {
    event.preventDefault();
    window.location = `https://save-a-stray.herokuapp.com/auth/google`;

  }

  render() {
    const {
      loading
    } = this.state;
    const icon = 'fa ' + (loading ? 'fa-refresh fa-spin' : 'fa-facebook');

    return ( <a href='/auth/google' onClick={this.onGoogleLogin}>
      <i className={icon}>
      </i> Google </a>


    );
  }
}

export default graphql(gql `
  mutation googleSignIn($code: String!) {
    googleSignIn(code: $code) {
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
`)(GoogleSignIn);