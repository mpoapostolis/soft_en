import React from "react";
import * as styles from "./css";
// here we import style

const Login = props => {
  const { container } = styles;
  return (
    <div className={container}>
      <h1>Login</h1>
    </div>
  );
};

export default Login;
