import React, { Component } from "react";
import { Query } from "react-apollo";
import Mutations from "../graphql/mutations"
import { withRouter } from "react-router";
import './css/AnimalFeedItem.css'
class AnimalFeedItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(id){
     
    this.props.history.push(`/AnimalShow/${id}`)
  }

  render() {
    let picture = this.props.animal.image
    return (
        <div className='animal-feed-item-div'>
          <div className='animal-feed-item-header'>
            <p>{this.props.animal.name}</p>
            <p>{this.props.animal.age}</p>
            <p>{this.props.animal.sex}</p>
          </div>
          <div id='animal-feed-item-image-container' style={{'background': `url(${picture})`, 'backgroundSize': 'cover'}}>

            {/* <img className='animal-feed-image' src='https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/46201085/1/?bust=1570458597&width=560' alt='hello'/> */}
          </div>
            
            <button onClick={() => this.handleClick(this.props.animal._id)} className='apply-button'>See Details</button>
        </div>
    );
  }
}
export default withRouter(AnimalFeedItem);