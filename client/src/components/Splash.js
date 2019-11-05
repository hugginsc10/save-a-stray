import { Query } from "react-apollo";
import Queries from "../graphql/queries";
import { ApolloConsumer } from 'react-apollo';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './css/splash.css'
const { IS_LOGGED_IN } = Queries;

function openFeed(e){
  let button = document.getElementById('splash-button')
  if (button.classList[0] === 'closed'){
  button.classList.remove('closed')
  button.classList.add('open')
  }
  else{
    button.classList.remove('open')
    button.classList.add('closed')
  }
}

const Splash = props => {
  return (
    <div id='splash'>
        <div id='splash-top'>   
            <button onClick={e => openFeed(e)} className='closed' id='splash-button'>Browse Local Animals</button>
            
        </div>
    </div>
  );
};

export default withRouter(Splash);