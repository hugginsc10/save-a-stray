import React, { Component } from "react";
import { Query } from "react-apollo";
import Mutations from "../graphql/mutations"
import './AnimalFeedItem.css'
class AnimalFeedItem extends Component {
  constructor(props) {
    super(props);

  }

  
  
  
  render() {
    return (
        <div className='animal-feed-item-div'>
            <p>{this.props.animal.name}</p>
            <p>{this.props.animal.type}</p>
            <p>{this.props.animal.age}</p>
            <p>{this.props.animal.sex}</p>
            
            {/* <img src={this.props.ianimal.image}/> */}
            <button className='apply-button'>See Details</button>
        </div>
    );
  }
}
export default AnimalFeedItem;