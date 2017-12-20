import React from "react";
import Button from "../Button";
import * as styles from "./css";

{
  /* <img title={role} sry={link} className={avatar} alt={role[0]} />
<div className={item}>A</div> */
}
function Header(props) {
  const { role = "Guest", link = "www.google.com" } = props;
  const { avatar, container, item, test } = styles;
  return (
    <div className={container}>
      <Button className={test}>Login</Button>
    </div>
  );
}

export default Header;
