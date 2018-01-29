import React from "react";
import { Redirect } from "react-router-dom";
import * as styles from "./css.js";
import Header from "../../components/Header";

const AuthWrapper = props => {
  const Component = props.component;
  const { access_token } = props.account;
  const { container, content } = styles;
  const pathname = !access_token ? "/login" : "/";
  return true ? (
    <div className={container}>
      <Header {...props} />
      <div className={content}>
        <Component {...props} />
      </div>
    </div>
  ) : (
    <Href pathname={{ pathname }} />
  );
};

export const Href = ({ pathname }) => {
  return <Redirect to={pathname} />;
};

export default AuthWrapper;
