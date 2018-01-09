import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import AuthWrapper from "./Auth";

const Routes = props => {
  const { access_token = false } = props.account; // eslint-disable-line
  return (
    <Router>
      <div>
        <Route
          exact
          path="/"
          render={routeProps => <AuthWrapper {...props} {...routeProps} component={Home} path="/" />}
        />
      </div>
    </Router>
  );
};

export default Routes;
