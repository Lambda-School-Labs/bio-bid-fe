import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authState } = useOktaAuth();

  return (
    // Denies users from manually typing in url's to reach dashboard
    <Route
      {...rest}
      render={(props) =>
        authState.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
