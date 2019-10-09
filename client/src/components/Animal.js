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
          this.props.history.push("/");
        }}

      >
        {loginUser => (
          <div id='new-animal-form'>
            <h1 id='new-animal-header'>Put up an animal for adoption</h1>
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
              <input
              className='new-animal-form-input'
                value={this.state.name}
                onChange={this.update("name")}
                placeholder="name"
              />
              <input
              className='new-animal-form-input'
                value={this.state.type}
                onChange={this.update("type")}
                placeholder="type"
              />
              <input
              className='new-animal-form-input'
                value={this.state.age}
                onChange={this.update("age")}
                placeholder="age"
              />
              <input
              className='new-animal-form-input'
                value={this.state.sex}
                onChange={this.update("sex")}
                placeholder="sex"
              />
              <input
              className='new-animal-form-input'
                value={this.state.color}
                onChange={this.update("color")}
                placeholder="color"
              />
              <input
              className='new-animal-form-input'
                value={this.state.description}
                onChange={this.update("description")}
                placeholder="description"
              />
              <input
              className='new-animal-form-input'
                value={this.state.image}
                onChange={this.update("image")}
                placeholder="image"
              />
              <input
              className='new-animal-form-input'
                value={this.state.video}
                onChange={this.update("video")}
                placeholder="video"
              />
              <input
              className='new-animal-form-input'
                value={this.state.application}
                onChange={this.update("application")}
                placeholder="application"
              />
              <br/>
              <button type="submit">Add Animal</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}
export default NewAnimal;