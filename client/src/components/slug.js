import { Query } from "react-apollo";
import Queries from "../graphql/queries";
import { ApolloConsumer } from 'react-apollo';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './slug.css'
const { IS_LOGGED_IN } = Queries;

const Slug = props => {
  return (
    <div id='slug'>
        <Link id='logo' to="/">
            <h1 id='logo-h1'>Save Your Stray</h1>
        </Link>
        <p id='lorem'>Save Your Stray is a non-profit operation with 
        the aim of making it easier to rescue and foster abandoned animals.
        We partner with local shelters in order to promote the adoption of animals without a home.
        </p>   
    </div>
  );
};

export default withRouter(Slug);