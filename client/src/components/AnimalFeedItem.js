import React, { Component } from "react";
import { Query } from "react-apollo";
import Mutations from "../graphql/mutations"

class NewAnimal extends Component {
  constructor(props) {
    super(props);

  }

  
  
  
  render() {
    return (
        <div>
            <p>{this.props.animal.name}</p>
            <p>{this.props.animal.type}</p>
            <p>{this.props.animal.age}</p>
            <p>{this.props.animal.sex}</p>
            <p>{this.props.animal.color}</p>
            <p>{this.props.animal.description}</p>
            <p>{this.props.animal.application}</p>
            <img src={this.props.ianimal.image}/>
            <button>Apply to adopt</button>
        </div>
    );
  }
}
export default NewAnimal;