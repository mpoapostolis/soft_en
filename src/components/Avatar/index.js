import React from "react";
import * as styles from "./css.js";

function Avatar(props) {
  const { container } = styles;
  const { role, src } = props;
  return (
    <div title={role} className={container}>
      {src ? <img title={role} src={src} alt=":)" /> : <div>{role[0]}</div>}
    </div>
  );
}

export default Avatar;
