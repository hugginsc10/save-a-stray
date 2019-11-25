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
    this.show = false
    this.showForm = this.showForm.bind(this)
  }
<<<<<<< HEAD
  handleClick(){
    debugger
  }
=======

  showForm(){
    let app = document.getElementById('show-application-wrapper')
    app.classList.toggle('hidden', false)
    window.scrollTo({
      top: (app.offsetHeight + 50),
      behavior: 'smooth'
    })
  }

  // backToFeed(){
  //   history.pushState()
  // }
>>>>>>> bdd240bf5004d7e7edc833ff60f90b91a9506485
  
  
  
  render() {
     let form = <NewApplication id='show-application' className='hidden'/> 
     let backText = '<-- Back to other pets'
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
<<<<<<< HEAD
                            <h1>{data.animal.name}</h1>
                            <img id='show-image' src={data.animal.image}/>
                            <p>Hi my name is <span>{data.animal.name}</span></p>
                            <p>I am a {data.animal.age} year old {data.animal.sex}</p>
                            
                            <p>My coat is {data.animal.color}</p>
                            <p>People say: {data.animal.description}</p>
                            <p>{data.animal.application}</p>
                            <button onClick={this.handleClick(data.animal._id)} id='adopt-button'>Apply to adopt {data.animal.name}</button>
=======
                            <div id='animal-show-header'>
                              <a href='/#/Landing' id='back-button'>{backText}</a>
                              <h1 id='show-dog-name'>{data.animal.name}</h1>
                            </div>
                            <div id='animal-show-wrapper'>
                              <div id='animal-show-description'>

                                <p>Hi my name is <span>{data.animal.name}</span>.
                                <br/>
                                I am a {data.animal.age} year old {data.animal.sex}.
                                <br/>
                                My coat is {data.animal.color}.
                                <br/>
                                People say: {data.animal.description}
                                {data.animal.application}</p>
                                <button id='adopt-button' onClick={this.showForm}>Apply to adopt {data.animal.name}</button>
                              </div>
                              <img id='show-image' src={data.animal.image}/>
                            </div>
                            <div id='show-application-wrapper' className='hidden'>
                                {form}
                            </div>
                           
>>>>>>> bdd240bf5004d7e7edc833ff60f90b91a9506485
                        </div>
                    );
                    }
            }}
            </Query>
            
        )
    
    
    

  }
}
export default AnimalShow;