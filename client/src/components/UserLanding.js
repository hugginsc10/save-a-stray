import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {Query} from "react-apollo";
import Queries from "../graphql/queries"
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
  }

  render() {
        let main; 
        if (this.state.currentSelector === null) {
          main = <div>Pick a Animal plz...</div>
        } else {

          main = <Query
            query={FIND_ANIMALS}
            variables={{type:this.state.currentSelector}}
          >
            {({ loading, error, data }) => {
                if (loading) return <p>Loading</p>;
                if (error) return <p>Error</p>;
                debugger
                let allAn = data.findAnimals.map(name => {
                debugger
                return <li>{name}</li>})
                return (<div>
                  <ul>
                    {allAn}
                  </ul>
                </div>);
            }}
        </Query>
        }
    return (
      <div>
        <h1 id='user-nav' >User Landing Page </h1>
        <div>
          <button onClick={e => this.updateCurrentSelector("Dogs")}>Dogs</button>
          <button onClick={e => this.updateCurrentSelector("Cats")}>Cats</button>
          <button onClick={e => this.updateCurrentSelector("Outher")}>Outhers</button>
        </div>
        {main}
        {/* <Feed animals={data.animals}/> */}
        {/* <Link to="/newApplication">New Application</Link> */}
      </div>
    )
  
  }
}
export default UserLanding;
                  