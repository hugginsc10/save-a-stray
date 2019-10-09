import { Query } from "react-apollo";
import Queries from "../graphql/queries";
import { ApolloConsumer } from 'react-apollo';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './splash.css'
const { IS_LOGGED_IN } = Queries;

const Splash = props => {
  return (
    <div id='splash'>
        <div id='splash-top'>   
            <button className='splash-button'>Browse Local Animals</button>
            
        </div>
    </div>
  );
};

export default withRouter(Splash);