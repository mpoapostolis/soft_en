import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
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
        <Route
          exact
          path="/login"
          render={routeProps => <AuthWrapper {...props} {...routeProps} component={Login} path="/login" />}
        />
        <Route
          exact
          path="/register"
          render={routeProps => <AuthWrapper {...props} {...routeProps} component={Register} path="/register" />}
        />
      </div>
    </Router>
  );
};

export default Routes;
