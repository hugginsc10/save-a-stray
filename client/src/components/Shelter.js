import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../graphql/mutations"
const { CREATE_SHELTER } = Mutations

class NewShelter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      location: "",
      users: "",
      paymentEmail: "",
      animals: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }
  
  
  render() {
    return (
      <Mutation
        mutation={CREATE_SHELTER}
        onCompleted={data => {
          const { newShelter } = data.newShelter;
          localStorage.setItem("Shelter", newShelter);
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
                    location: this.state.location,
                    users: this.state.users,
                    paymentEmail: this.state.paymentEmail,
                    animals: this.state.animals
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
                value={this.state.location}
                onChange={this.update("location")}
                placeholder="location"
              />
              <input
                value={this.state.users}
                onChange={this.update("users")}
                placeholder="users"
              />
              <input
                value={this.state.paymentEmail}
                onChange={this.update("paymentEmail")}
                placeholder="Payment Email"
              />
              <input
                value={this.state.animals}
                onChange={this.update("animals")}
                placeholder="animals"
              />
              <button type="submit">new shelter</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}
export default NewShelter;