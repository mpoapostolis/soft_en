import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Private from "./Private";
import Login from "./Login";
import Register from "./Register";
import AuthWrapper from "../components/AuthWrapper";
import Header from "../components/Header";

const Routes = props => {
  return (
    <Router>
      <main>
        <Header {...props} />
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
      </main>
    </Router>
  );
};

export default Routes;
