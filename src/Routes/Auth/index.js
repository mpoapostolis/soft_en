import React from "react";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import { Redirect } from "react-router-dom";
import * as styles from "./css.js";

const AuthWrapper = props => {
  const Component = props.component;
  const { access_token } = props.account;
  const { container, sidebar, header, content } = styles;
  const pathname = !access_token ? "/login" : "/";
  return true ? (
    <div className={container}>
      <div className={sidebar}>
        <Menu {...props} />
      </div>
      <div className={header}>
        <Header {...props} />
      </div>
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
