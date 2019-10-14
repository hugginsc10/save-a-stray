import React, {
  Component
} from 'react';
import {ApolloConsumer, Mutation} from 'react-apollo';
import querystring from 'querystring';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import {withRouter} from "react-router-dom";
import Mutations from '../graphql/mutations';
const {FACEBOOK_LOGIN} = Mutations;
class FacebookSignIn extends Component {
  constructor(props) {
    super(props);
    this.onFacebookLogin = this.onFacebookLogin.bind(this);
    this.appId = '515957642529597';
    this.redirectUrl = `https://localhost:3000/auth/facebook/callback`;

    if (document.location.pathname === '/') {
      this.code = querystring.parse(document.location.search)['?code'];
    }

    this.state = {
      loading: false,
    };
  }
  update(field) {
    return e => this.setState({ [field]: e.target.value })
  }
  updateCache(client, {data}) {
    client.writeData({
      data: {...data.login}
    });
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
      // event.preventDefault();
      window.location = `htttps://localhost:3000/auth/facebook`;

    }

    render() {
      const {
        loading
      } = this.state;
      const icon = 'fa ' + (loading ? 'fa-refresh fa-spin' : 'fa-facebook');

      return (<a className='modal-button' id='facebook-button' href = '/auth/facebook'
        onClick = {this.onFacebookLogin()}> 
        <i className = {icon} > 
        </i> Sign in with Facebook </a >
      );
    }
  }

export default withRouter(FacebookSignIn);