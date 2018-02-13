import * as styles from "./css";

import React from "react";
function TextField(props) {
  const { label, value, error, klass, url,changeType } = props;
  const { inputCont, input, hide } = styles;
  return (
    <div className={inputCont}>
      <label className={`inputLabel ${value ? "notEmpty" : ""} `}>{label}</label>
      <input autoComplete="off" autoFocus={true} className={`${input} ${klass} ${error ? "error" : ""}`} {...props} />
      {url ? <img className={hide} onClick={changeType} src={url} /> : null}
    </div>
  );
}

export default TextField;
