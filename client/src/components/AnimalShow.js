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
        </div>
    );
  }
}
export default NewAnimal;