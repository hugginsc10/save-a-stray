import React from "react";
import {Query,ApolloConsumer} from "react-apollo";
import Querys from "../graphql/queries";
import UserShow from "./UserLanding";
import ShelterShow from "./Shelter";
import './css/AnimalShow.css'
const { FETCH_ANIMAL} = Querys;

class NewAnimal extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
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
  handleClick(){
    debugger
  }
  
  
  
  render() {
     
        return(
            <Query
            query={FETCH_ANIMAL}
            variables={{ id: this.props.match.params.id }}

            >                        
                {({ loading, error, data }) => {
                    if (loading){
                        return <h1>Loading</h1>
                    }else{
                       
                      return (
                        <div id='animal-show-top'>
                            <h1>{data.animal.name}</h1>
                            <img id='show-image' src={data.animal.image}/>
                            <p>Hi my name is <span>{data.animal.name}</span></p>
                            <p>I am a {data.animal.age} year old {data.animal.sex}</p>
                            
                            <p>My coat is {data.animal.color}</p>
                            <p>People say: {data.animal.description}</p>
                            <p>{data.animal.application}</p>
                            <button onClick={this.handleClick(data.animal._id)} id='adopt-button'>Apply to adopt {data.animal.name}</button>
                        </div>
                    );
                    }
            }}
            </Query>
        )
    
    
    

  }
}
export default NewAnimal;