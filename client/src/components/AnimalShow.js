import React from "react";
import {Query,ApolloConsumer} from "react-apollo";
import Querys from "../graphql/queries";
import UserShow from "./UserLanding";
import ShelterShow from "./Shelter";
import NewApplication from "./Application"
import './css/AnimalShow.css'
const { FETCH_ANIMAL} = Querys;

class AnimalShow extends React.Component {
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
    this.show = false
    this.showForm = this.showForm.bind(this)
  }

  showForm(){
    document.getElementById('show-application-wrapper').classList.toggle('hidden', false)

  }
  
  
  
  render() {
     let form = <NewApplication id='show-application' className='hidden'/> 
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
                            <h1 id='show-dog-name'>{data.animal.name}</h1>
                            <div id='animal-show-wrapper'>
                              <img id='show-image' src={data.animal.image}/>
                              <div id='animal-show-description'>

                                <p>Hi my name is <span>{data.animal.name}</span>.
                                I am a {data.animal.age} year old {data.animal.sex}.
                                My coat is {data.animal.color}.
                                <br/>
                                People say: {data.animal.description}
                                {data.animal.application}</p>
                                <button id='adopt-button' onClick={this.showForm}>Apply to adopt {data.animal.name}</button>
                              </div>
                            </div>
                            <div id='show-application-wrapper' className='hidden'>
                                {form}
                            </div>
                           
                        </div>
                    );
                    }
            }}
            </Query>
            
        )
    
    
    

  }
}
export default AnimalShow;