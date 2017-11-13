import React from "react";
import * as styles from "./css";
// here we import style

const Header = props => {
  const { container } = styles;
  const { loggedIn=true } = props;
  return <div className={container} />;
};

export default Header;
