import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../graphql/mutations"
const { CREATE_APPLICATION } = Mutations

class NewApplication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animalId: "",
      userId: "",
      applicationData: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }
  
  
  render() {
    return (
      <Mutation
        mutation={CREATE_APPLICATION}
        onCompleted={data => {
          const { newApplication } = data.newApplication;
          localStorage.setItem("Application", newApplication);
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
                    animalId: this.state.animalId,
                    userId: this.state.userId,
                    applicationData: this.state.applicationData
                  }
                });
              }}
            >
              <input
                value={this.state.animalId}
                onChange={this.update("animalId")}
                placeholder="animalId"
              />
              <input
                value={this.state.userId}
                onChange={this.update("userId")}
                placeholder="userId"
              />
              <input
                value={this.state.applicationData}
                onChange={this.update("applicationData")}
                placeholder="applicationData"
              />
              <button type="submit">Submit Application</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}
export default NewApplication;