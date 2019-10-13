import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../graphql/mutations"
import './Animal.css'
const { CREATE_ANIMAL } = Mutations

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

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }
  
  
  render() {
    return (
      <Mutation
        mutation={CREATE_ANIMAL}
        onCompleted={data => {
          console.log(data)
          const { newAnimal } = data.newAnimal;
          localStorage.setItem("Animal", newAnimal);
          // console.log(client)
          this.props.history.push("/");
        }}

      >
        {loginUser => (
          <div id='new-animal-form'>
            
            <form id='new-animal-form-form'
              onSubmit={e => {
                e.preventDefault();
                loginUser({
                  variables: {
                    name: this.state.name,
                    type: this.state.type,
                    age: parseInt(this.state.age),
                    sex: this.state.sex,
                    color: this.state.color,
                    description: this.state.description,
                    image: this.state.image,
                    video: this.state.video,
                    applications: this.state.application
                  }
                });
              }}
            >
              <h1 id='new-animal-header'>Put up an animal for adoption</h1>
              <div id='seperator'></div>
              <input id='animal-name'
              className='new-animal-form-input'
                value={this.state.name}
                onChange={this.update("name")}
                placeholder="name"
              />
              <input id='animal-type'
              className='new-animal-form-input'
                value={this.state.type}
                onChange={this.update("type")}
                placeholder="type"
              />
              <div id='sex-and-age'>
                <input id='animal-age'
                className='new-animal-form-input'
                  value={this.state.age}
                  onChange={this.update("age")}
                  placeholder="age"
                />
                <div id='radio-buttons'>
                  <div className='radio-div'>  
                    <p>M:</p>
                    <input
                    id='male'
                    className='new-animal-form-input'
                      type='radio'
                      value={this.state.sex}
                      onChange={this.update("sex")}
                      name='gender'
                    />
                  </div>
                  <div className='radio-div'>
                    <p>F:</p>
                    <input
                    id='female'
                    className='new-animal-form-input'
                      type='radio'
                      value={this.state.sex}
                      onChange={this.update("sex")}
                      name='gender'
                    />
                  </div>
                </div>
              </div>
              <input id='animal-color'
              className='new-animal-form-input'
                value={this.state.color}
                onChange={this.update("color")}
                placeholder="color"
              />
              <input id='animal-description'
              className='new-animal-form-input'
                value={this.state.description}
                onChange={this.update("description")}
                placeholder="description"
              />
              <div id='image-preview'>
                  
              </div>
              
              <input id='animal-video'
              className='new-animal-form-input'
                value={this.state.video}
                onChange={this.update("video")}
                placeholder="video-url"
              />
              <br/>
              <button id='new-animal-submit' type="submit">Add Animal</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}
export default NewAnimal;