import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../graphql/mutations"
const { CREATE_ANIMAL } = Mutations

class NewAnimal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      type: "",
      age: 0,
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
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                loginUser({
                  variables: {
                    name: this.state.name,
                    type: this.state.type,
                    age: this.state.age,
                    sex: this.state.sex,
                    color: this.state.color,
                    description: this.state.description,
                    image: this.state.image,
                    video: this.state.video,
                    application: this.state.application
                  }
                });
              }}
            >
              <input
                value={this.state.name}
                onChange={this.update("name")}
                placeholder="name"
              />
              <input
                value={this.state.type}
                onChange={this.update("type")}
                placeholder="type"
              />
              <input
                value={this.state.age}
                onChange={this.update("age")}
                placeholder="age"
              />
              <input
                value={this.state.sex}
                onChange={this.update("sex")}
                placeholder="sex"
              />
              <input
                value={this.state.color}
                onChange={this.update("color")}
                placeholder="color"
              />
              <input
                value={this.state.description}
                onChange={this.update("description")}
                placeholder="description"
              />
              <input
                value={this.state.image}
                onChange={this.update("image")}
                placeholder="image"
              />
              <input
                value={this.state.video}
                onChange={this.update("video")}
                placeholder="video"
              />
              <input
                value={this.state.application}
                onChange={this.update("application")}
                placeholder="application"
              />
              <button type="submit">Log In</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}
export default NewAnimal;