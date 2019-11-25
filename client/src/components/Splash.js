import { Query } from "react-apollo";
import Queries from "../graphql/queries";
import { ApolloConsumer } from 'react-apollo';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './css/splash.css'
import UserLanding from "./UserLanding";
const { IS_LOGGED_IN } = Queries;


function openFeed(e){
  let button = document.getElementById('splash-button')
  let feed = document.getElementById('splash-feed-wrapper')
  button.classList.toggle('closed')
  button.classList.toggle('open')
  feed.classList.toggle('hidden')
}


const Splash = props => {

  return (
    <div id='splash'>
        <div id='splash-top'>   
            <button  className='closed' id='splash-button'>
            <h2 id='browse' onClick={e => openFeed(e)}>Browse Animals</h2>
            {/* <h2 id='browse' onClick={e => openFeed(e)}>Browse Local Animals</h2> mark rfq */}
              <div id='splash-feed-wrapper' className='hidden'>
                <p id='splash-feed-exit' onClick={e => openFeed(e)}>X</p>
                < UserLanding splash={"splash"}/>
                {/* <div id='google-maps-wrapper'>
                    <div id='mock-map'></div>
                    <input id='splash-slider' type='range' min='1' max='400'/>
                </div> mark rfq */}
                 
              </div>
            </button>
            
        </div>
    </div>
  );
};

export default withRouter(Splash);