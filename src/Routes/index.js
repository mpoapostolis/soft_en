import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import AuthWrapper, { Href } from "./Auth";

const Routes = props => {
  const { access_token } = props.account;
  return (
    <Router>
      <div>
        <Route
          exact
          path="/"
          render={routeProps => <AuthWrapper {...props} {...routeProps} component={Home} path="/" />}
        />
        <Route
          path="/login"
          render={routeProps =>
            !access_token ? <Login {...props} {...routeProps} /> : <Href pathname={{ pathname: "/" }} />
          }
        />
      </div>
    </Router>
  );
};

export default Routes;
