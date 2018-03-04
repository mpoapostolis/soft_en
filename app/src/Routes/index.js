import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import CreateActivity from "./CreateActivity";
import Search from "./Search";
import Booking from "./Booking";
import OwnerProfile from "./OwnerProfile";
import Listing from "./Listing";
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
          <Route
            path="/search"
            render={routeProps => <Search {...routeProps} {...props} />}
          />

          <Route
            path="/new-activity"
            render={routeProps => <CreateActivity {...routeProps} {...props} />}
          />

          <Route
            path="/owner-profile"
            render={routeProps => <OwnerProfile {...routeProps} {...props} />}
          />

          <Route
            path="/listing-activity"
            render={routeProps => <Listing {...routeProps} {...props} />}
          />

                  <Route
            path="/booking"
            render={routeProps => <Booking {...routeProps} {...props} />}
          />



        </Switch>
      </main>
    </Router>
  );
};

export default Routes;
