import React, { Component } from "react";
import { Link } from 'react-router-dom';


class ShelterLanding extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <h1>Shelter Landing Page </h1>
          <Link to="/newAnimal">New Animal</Link>
      </div>
    )
  
  }
}
export default ShelterLanding;
                  