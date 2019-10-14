import React from "react";
import {Query,ApolloConsumer} from "react-apollo";
import Querys from "../graphql/queries";
import UserShow from "./UserLanding";
import ShelterShow from "./Shelter";
const { FETCH_ANIMAL} = Querys;

class NewAnimal extends React.Component {
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
    debugger
        return(
            <Query
            query={FETCH_ANIMAL}
            variables={{ id: this.props.match.params.id }}

            >                        
                {({ loading, error, data }) => {
                    if (loading){
                        return <h1>Loading</h1>
                    }else{
                      debugger
                      return (
                        <div>
                          <p>{data.animal.name}</p>
                            <p>{data.animal.type}</p>
                            <p>{data.animal.age}</p>
                            <p>{data.animal.sex}</p>
                            <p>{data.animal.color}</p>
                            <p>{data.animal.description}</p>
                            <p>{data.animal.application}</p>
                            <img src={data.animal.image}/>
                            <button>Apply to adopt</button>
                        </div>
                    );
                    }
            }}
            </Query>
        )
    
    
    

  }
}
export default NewAnimal;