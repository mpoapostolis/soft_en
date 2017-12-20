import React from "react";
import * as styles from "./css";

function Button(props) {
  const { btnContainer } = styles;
  const parrentClass = props.className;
  return (
    <button {...props} className={` ${btnContainer} ${parrentClass} `}>
      {props.children}
    </button>
  );
}

export default Button;
