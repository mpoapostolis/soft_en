import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Header from '../components/Header'
import Home from '../components/Home'
import Login from "../components/Login";
import * as styles from './css'

const Href = ({ pathname }) => {
  return <Redirect to={pathname} />;
};
const AuthWrapper = props => {
  const Component = props.component;
  const { loggedIn = true } = props.account;
  const { container, headContainer, bodyContainer } = styles;
  return loggedIn ? (
    <main className={container}>
      <div className={headContainer}>
        <Header {...props} />
      </div>
      <div className={bodyContainer}>
        <Component {...props} />
      </div>
    </main>
  ) : (
    <Href pathname={{ pathname: "/login" }} />
  );
};

const Routes = props => {
  const { loggedIn } = props.account;
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
            !loggedIn ? <Login {...props} {...routeProps} /> : <Href pathname={{ pathname: "/" }} />}
        />
      </div>
    </Router>
  );
};

export default Routes;
