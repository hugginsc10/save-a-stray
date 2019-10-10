import { Query } from "react-apollo";
import Queries from "../graphql/queries";
import { ApolloConsumer } from 'react-apollo';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './App.css'
const { IS_LOGGED_IN } = Queries;

const Nav = props => {
  return (
    <div id='navbar'>     
      <div id='nav-right'>
        <ApolloConsumer>
          {client => (
            <Query query={IS_LOGGED_IN}>
              {({ data }) => {
                if (data.isLoggedIn) {
                  return (
                    <div className='auth-links'>
                      <button id='logout'
                        onClick={e => {
                          e.preventDefault();
                          localStorage.removeItem("auth-token");
                          client.writeData({ data: { isLoggedIn: false } });
                          props.history.push("/");
                        }}
                      >
                        Logout
                      </button>
                    </div>

                  );
                } else {
                  return (
                    <div className='auth-links'>
                      <Link to="/login">Login</Link>
                      <br />
                      <Link to="/register">Register</Link>
                      <br/>
                      <Link>Shelters</Link>
                      <br/>
                      <Link>Donate</Link>

                    </div>
                  );
                }
              }}
            </Query>
          )}
        </ApolloConsumer>
      </div>
      {/* <div id='hamburger'>
              <ul>

              </ul>
      </div> */}
    </div>
  );
};

export default withRouter(Nav);