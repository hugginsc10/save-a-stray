import React, { Component } from "react";
import { Query } from "react-apollo";
import Mutations from "../graphql/mutations"

class NewAnimal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      type: "",
      age: "",
      sex: "",
      color: "",
      description: "",
      image: "",
      video: "",
      application: ""
    };
  }

  
  
  
  render() {
    return (
        <div>
          <p>{this.state.animal.name}</p>
            <p>{this.state.animal.type}</p>
            <p>{this.state.animal.age}</p>
            <p>{this.state.animal.sex}</p>
            <p>{this.state.animal.color}</p>
            <p>{this.state.animal.description}</p>
            <p>{this.state.animal.application}</p>
            <img src={this.state.ianimal.image}/>
            <button>Apply to adopt</button>
        </div>
    );
  }
}
export default NewAnimal;