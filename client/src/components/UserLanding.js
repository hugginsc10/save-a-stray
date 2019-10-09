import React, { Component } from "react";
import { Link } from 'react-router-dom';


class UserLanding extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>
        <h1>User Landing Page </h1>
        <Link to="/newApplication">New Application</Link>
      </div>
    )
  
  }
}
export default UserLanding;
                  