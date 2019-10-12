import React from "react";
import {Query,ApolloConsumer} from "react-apollo";
import Querys from "../graphql/queries";
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
        debugger
                const user = client.readQuery({
                    query: USER_ID
                    })
                    debugger
                    this.userId = user.userId
    return(
        <Query
        query={FETCH_USER}
        variables={{ _id: this.userId }}
        onCompleted={data => { 
            console.log("stop")      
            console.log("stop")      
            console.log("stop")      
            console.log("stop")      
            console.log("stop")      
            debugger              
            if (data.userRole === "admin") {

                this.props.history.push("/Shelter");
            } else {
                this.props.history.push("/User")
            }
        }}
        update={(client, data) => this.updateCache(client, data)}

        >                        
            {({ loading, error, data }) => {
                debugger
                return (
                    <div></div>
                );
        }}
        </Query>
        )
    }}
        </ApolloConsumer>
    )
    }
}

export default Landing