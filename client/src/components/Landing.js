import React from "react";
import {Query,ApolloConsumer} from "react-apollo";
import Querys from "../graphql/queries";
import UserShow from "./UserLanding";
import ShelterShow from "./Shelter";
const { FETCH_USER,USER_ID} = Querys;



class Landing extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId: ""
        };
        this.userId = "";
    }



render(){
    return (
    <ApolloConsumer>{client => {
        
                const user = client.readQuery({
                    query: USER_ID
                    })
                    
                    this.userId = user.userId
    return(
        <Query
        query={FETCH_USER}
        variables={{ _id: this.userId }}
        // onCompleted={data => {            

        // }}
        update={(client, data) => this.updateCache(client, data)}

        >                        
            {({ loading, error, data }) => {
                if (loading){
                    return <h1>Loading</h1>
                }else{
                    if (data.user.userRole === "admin") {
                        console.log("render the shelter conponint with the shelter info as a prop")
                        return <ShelterShow shelterInfo={data.user.shelter}/>
                    } else if (data.user.userRole === "endUser") {
                        console.log("render the User conponint with the user info as a prop")
                        return <UserShow user={data.user}/>
                    }   
                }
        }}
        </Query>
        )
    }}
        </ApolloConsumer>
    )
    }
}

export default Landing