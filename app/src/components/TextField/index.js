import React, { Component } from "react";
import * as styles from "./css";

class TextField extends Component {
  state = {
    errorClass: "",
    value: ""
  };

  isValid = ({ currentTarget }) => {
    let isValid;
    const {
      setTmpData,
      type,
      validator,
      field,
      list,
      changeParrentState,
      allField: { password1 }
    } = this.props;
    const value = currentTarget.value;
    const options = list || [];
    switch (validator) {
      case "email":
        const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        isValid = Boolean(value.match(pattern));
        break;

      case "no-empty":
        isValid = value.length > 0;
        break;

      case "password":
        if (value && !password1) isValid = false;
        else if (password1 && value && password1 !== value) isValid = false;
        else isValid = true;
        break;

      case "select":
        isValid = Boolean(options.find(e => e === value));
        break;
      default:
        isValid = true;
        break;
    }
    setTmpData({ [field]: value });
    if (!isValid) this.setState({ errorClass: "error" });
    else this.setState({ errorClass: "" });
  };

  handleChange = ({ currentTarget }) =>
    this.setState({ value: currentTarget.value });

  render() {
    const { errmsg, type, list, label, field } = this.props;
    const { inputCont, input } = styles;
    const _id = list ? Date.now() : undefined;
    const { errorClass, value } = this.state;
    const labelExtraClass = value ? "notEmpty" : "";

    return (
      <div className={inputCont}>
        <label className={`inputLabel ${labelExtraClass} ${errorClass}`}>
          {errorClass ? errmsg : label}
        </label>
        <input
          className={`${input} ${errorClass}`}
          onChange={this.handleChange}
          onBlur={this.isValid}
          type={type}
          list={list}
          value={value}
        />
        {list && (
          <datalist id={list}>
            {list.map((opt, key) => <option key={key} value={opt} />)}
          </datalist>
        )}
      </div>
    );
  }
}

export default TextField;
