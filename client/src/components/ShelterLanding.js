import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './css/ShelterLanding.css'

class ShelterLanding extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div id='shelter-landing-top'>
        <h1>Let us help you find owners for your animals!</h1>
          <Link to="/newAnimal">New Animal</Link>
      </div>
    )
  
  }
}
export default ShelterLanding;
                  