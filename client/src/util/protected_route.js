import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../graphql/queries";
const { IS_LOGGED_IN } = Queries;

// our route switches on routeType
const ProtectedRoute = ({
  component: Component,
  path,
  exact,
  routeType,
  ...rest
}) => (
    <Query query={IS_LOGGED_IN}>
      {({ data }) => {
        // if the route type is "" then this route will only render if the
        // user is logged in
        if (routeType === "") {
          return (
            <Route
              path={path}
              exact={exact}
              render={props =>
                data.isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
              }
            />
          );
        } else {
          // otherwise this will be a protected route which will only
          // render the component if the user is logged in
          return (
            <Route
              {...rest}
              render={props =>
                data.isLoggedIn ? (
                  <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                  )
              }
            />
          );
        }
      }}
    </Query>
  );

export default ProtectedRoute;