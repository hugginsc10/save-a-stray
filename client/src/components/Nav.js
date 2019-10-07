import { Query } from "react-apollo";
import Queries from "../graphql/queries";
import { ApolloConsumer } from 'react-apollo';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const { IS_LOGGED_IN } = Queries;

const Nav = props => {
  return (
    <div id='auth-links'>
    <ApolloConsumer>
      {client => (
        <Query query={IS_LOGGED_IN}>
          {({ data }) => {
            if (data.isLoggedIn) {
              return (
                <div>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      localStorage.removeItem("auth-token");
                      client.writeData({ data: { isLoggedIn: false } });
                      props.history.push("/");
                    }}
                  >
                    Logout
                  </button>
                   <br />
                  <Link to="/newAnimal">New Animal</Link>
                  <br />
                  <Link to="/newApplication">New Application</Link>
                </div>

              );
            } else {
              return (
                <div>
                  <Link to="/login">Login</Link>
                  <br />
                  <Link to="/register">Register</Link>


                </div>
              );
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
    </div>
  );
};

export default withRouter(Nav);