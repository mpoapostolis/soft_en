import * as styles from "./css";

import React from "react";
function TextField(props) {
  const { label, value, error } = props;
  const { inputCont, input } = styles;
  return (
    <div className={inputCont}>
      <label className={`inputLabel ${value ? "notEmpty" : ""} `}>{label}</label>
      <input {...props} className={`${input} ${error ? "error" : ""}`} />
    </div>
  );
}

export default TextField;
