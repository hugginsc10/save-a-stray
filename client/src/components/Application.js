import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../graphql/mutations"
import './css/application.css'
import { withRouter } from "react-router";

const { CREATE_APPLICATION } = Mutations

class NewApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animalId: this.props.animalId,
      userId: "",
      applicationData: "",
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      state: "",
      email: "",
      phoneNumber: "",
      housing: "",
      housingType: "",
      message: "",
      activityLevel: ""
    };
    this.submitApp = this.submitApp.bind(this)
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }
  submitApp() {
    // rfq Need to display a error message if the felds are blank
    this.setState({ message: "Application Successfully Submitted" });


  }
  
  
  render() {
    return (
      <Mutation
        mutation={CREATE_APPLICATION}
        onCompleted={data => {
          const { newApplication } = data.newApplication;
          localStorage.setItem("Application", newApplication);
          this.submitApp()
        }}

      >
        {( loginUser,{ loading, error, data }) => {
            if (loading) return <p>Loading</p>;
            let message= "";
            if (error) {
              message = error.graphQLErrors[0].message
            }
            return(
                <div id='application-form'>
                  <form id='application-form-form'
                    onSubmit={e => {
                      e.preventDefault();
                      loginUser({
                        variables: {
                          animalId: this.state.animalId,
                          userId: this.state.userId,
                          applicationData: 
                            `firstName: ${this.state.firstName}
                            lastName: ${this.state.lastName}
                            streetAddress: ${this.state.streetAddress}
                            city: ${this.state.city}
                            state: ${this.state.state}
                            email: ${this.state.email}
                            phoneNumber: ${this.state.phoneNumber}
                            housing: ${this.state.housing}
                            housingType: ${this.state.housingType}
                            activityLevel: ${this.state.activityLevel}`
                          
                          // applicationData: { NEEDS TO BE RFQ ASAP ... JUST TEMP TO GET IT WORKING 
                          //   firstName: this.state.firstName,
                          //   lastName: this.state.lastName,
                          //   streetAddress: this.state.streetAddress,
                          //   city: this.state.city,
                          //   state: this.state.state,
                          //   email: this.state.email,
                          //   phoneNumber: this.state.phoneNumber,
                          //   housing: this.state.housing,
                          //   housingType: this.state.housingType,
                          //   activityLevel: this.state.activityLevel
                          // }
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
                    <h2 id="app-message">{this.state.message}</h2>
                    <h1 id='application-header'>Application for adoption</h1>
                    <div id='seperator-2'></div>
                    <input
                    type='text' 
                    id='application-first-name' 
                    placeholder='first name' 
                    value={this.state.firstName}
                      onChange={this.update("firstName")}
                    >
                      

                    </input>

                    <input
                    type='text' 
                    id='application-last-name' 
                    placeholder='last name' 
                    value={this.state.lastName}
                      onChange={this.update("lastName")}
                    >
                      

                    </input>

                    <input
                    type='text' 
                    id='application-street-address' 
                    placeholder='street address' 
                    value={this.state.streetAddress}
                      onChange={this.update("streetAddress")}
                    >
                      

                    </input>

                    <input
                    type='text' 
                    id='application-city' 
                    placeholder='city' 
                    value={this.state.city}
                      onChange={this.update("city")}
                    >
                      

                    </input>

                    <input
                    type='text' 
                    id='application-state' 
                    placeholder='state' 
                    value={this.state.state}
                      onChange={this.update("state")}
                    >
                      

                    </input>

                    <input
                    type='text' 
                    id='application-email'
                    placeholder='email'
                    value={this.state.email}
                      onChange={this.update("email")}
                    >
                      

                    </input>

                    <input
                    type='text' 
                    id='application-phone-number'
                    placeholder='phone number'
                    value={this.state.phoneNumber}
                      onChange={this.update("phoneNumber")}
                    >
                      

                    </input>

                    <input
                    type='text' 
                    id='application-housing'
                    placeholder='what type of house do you live in?'
                    value={this.state.housing}
                      onChange={this.update("housing")}
                    >
                      

                    </input>

                    <input
                    type='text' id='application-housing-type'
                    placeholder='Do you rent or own?'
                    value={this.state.housingType}
                      onChange={this.update("housingType")}
                    >
                      

                    </input>

                    <input
                    type='textarea' id='application-noise-level' 
                    placeholder='what is your general noise and activity level?'
                    value={this.state.activityLevel}
                      onChange={this.update("activityLevel")}
                    >
                      

                    </input>

              

                    <button id='application-submit' type="submit">Submit Application</button>
                  </form>
                </div>
            )
        }}
      </Mutation>
    );
  }
}
export default withRouter(NewApplication);