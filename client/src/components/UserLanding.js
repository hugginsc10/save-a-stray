import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {Query} from "react-apollo";
import Queries from "../graphql/queries"
import AnimalFeedItem from './AnimalFeedItem'
import './userLanding.css'
const {FIND_ANIMALS} = Queries

class UserLanding extends Component {
  constructor(props) {
    super(props);
    this.updateCurrentSelector = this.updateCurrentSelector.bind(this)
    this.state = {
      currentSelector: null
    }

  }
  updateCurrentSelector(type){
    this.setState({currentSelector:type})
    let button = document.getElementById('feed-buttons')
    if (button){
    button.classList.add('small')
    button.classList.remove('big')
    }
  }

  render() {
        let main; 
        if (this.state.currentSelector === null) {
          main = <div id='prompt'>"When we adopt a dog or any pet, we know it is going to end with us having to say goodbye, but we still do it. And we do it for a very good reason: They bring so much joy and optimism and happiness. They attack every moment of every day with that attitude."</div>
        } else {

          main = <Query
            query={FIND_ANIMALS}
            variables={{type:this.state.currentSelector}}
          >
            {({ loading, error, data }) => {
                if (loading) return <p>Loading</p>;
                if (error) return <p style='color: red;'>Error</p>;
            
                let allAn = data.findAnimals.map(animal => {
            
                return <li className='animal-feed-item'><AnimalFeedItem animal={animal}/></li>})
                return (<div id='this-div'>
                  <ul id='animal-feed'>
                    {allAn}
                  </ul>
                </div>);
            }}
        </Query>
        }
    return (
      <div id='user-landing-top'>
        <h1 id='user-nav' >Browse Animals</h1>
        <div id='feed-buttons' className='big'>
          <button id='dogs-button' className='feed-button' onClick={e => this.updateCurrentSelector("Dogs")}></button>
          <button id='cats-button' className='feed-button' onClick={e => this.updateCurrentSelector("Cats")}></button>
          <button className='feed-button' onClick={e => this.updateCurrentSelector("Outher")}></button>

        </div>
        {main}
        {/* <Feed animals={data.animals}/> */}
        {/* <Link to="/newApplication">New Application</Link> */}
      </div>
    )
  
  }
}
export default UserLanding;
                  