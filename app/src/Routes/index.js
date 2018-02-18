import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Private from "./Private";
import Login from "./Login";
import Register from "./Register";
import AuthWrapper from "../components/AuthWrapper";

const Routes = props => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={routeProps => <Home {...routeProps} {...props} />}
        />
        <Route
          path="/login"
          render={routeProps => <Login {...routeProps} {...props} />}
        />
        <Route
          path="/register"
          render={routeProps => <Register {...routeProps} {...props} />}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
