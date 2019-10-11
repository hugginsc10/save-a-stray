import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../graphql/mutations"
import './application.css'
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
          console.log(data)
          const { newApplication } = data.newApplication;
          localStorage.setItem("Application", newApplication);
          this.props.history.push("/");
        }}

      >
        {loginUser => (
          <div id='application-form'>
            <form id='application-form-form'
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
              {/* <input className='application-form-input' 
                value={this.state.animalId}
                onChange={this.update("animalId")}
                placeholder="animalId"
              />
              <input className='application-form-input'
                value={this.state.userId}
                onChange={this.update("userId")}
                placeholder="userId"
              />
              <input className='application-form-input'
                value={this.state.applicationData}
                onChange={this.update("applicationData")}
                placeholder="applicationData"
              /> */}
              
              <h1 id='application-header'>Application for adoption</h1>
              <div id='seperator-2'></div>
              <input type='text' id='application-first-name' placeholder='first name' ></input>
              <input type='text' id='application-last-name' placeholder='last name' ></input>
              <input type='text' id='application-street-address' placeholder='street address' ></input>
              <input type='text' id='application-city' placeholder='city' ></input>
              <input type='text' id='application-state' placeholder='state' ></input>
              <input type='text' id='application-email'placeholder='email'></input>
              <input type='text' id='application-phone-number'placeholder='phone number'></input>
              <input type='text' id='application-housing'placeholder='housing'></input>
              <input type='text' id='application-housing-type'placeholder='housing-type'></input>
              <input type='textarea' id='application-noise-level' placeholder='what is your general noise and activity level?'></input>
        

              <button id='application-submit' type="submit">Submit Application</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}
export default NewApplication;