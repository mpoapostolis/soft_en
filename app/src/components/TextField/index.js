import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
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
      id
    } = this.props;
    if (id || type === "file" || type === "date") return;
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

  handleChange = evt => {
    const { setTmpData, type, field } = this.props;
    if (type === "file") setTmpData({ image: evt.currentTarget.files[0] });
    else if (type === "date") {
      console.log(evt.unix())            
      this.setState({ value: evt.utc().format("LLL") });
      setTmpData({ [field]: evt.utc().format("LLL") });
    } else this.setState({ value: evt.currentTarget.value });
  };

  handleChange1 = ({ currentTarget }) => {
    const { setTmpData, field1 } = this.props;
    setTmpData({ [field1]: parseInt(currentTarget.value) });
  };

  render() {
    const {
      errmsg,
      type,
      list,
      label,
      field,
      min,
      max,
      id,
      label1,
      type1
    } = this.props;
    console.log(this.state);

    const { inputCont, input, mpla } = styles;
    const _id = list ? Date.now() : undefined;
    const { errorClass, value, value1 } = this.state;
    const labelExtraClass = value ? "notEmpty" : "";
    const upload = type === "file" ? "upload" : "";
    return (
      <div className={inputCont}>
        <label className={`inputLabel ${labelExtraClass} ${errorClass}`}>
          {errorClass ? errmsg : label}
        </label>
        {type === "textarea" ? (
          <textarea
            className={`${input} textArea ${errorClass}`}
            onChange={this.handleChange}
            onBlur={this.isValid}
            value={value}
          />
        ) : type === "date" ? (
          <div className={mpla}>
            <DatePicker
              className={`${input} date ${errorClass}`}
              onSelect={this.handleChange}
              value={value}
              dateFormat="LLL"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
            />
            <input
              onChange={this.handleChange1}
              placeholder={label1}
              type={type1}
              className={`${input} second ${errorClass}`}
            />
          </div>
        ) : (
          <input
            className={`${input} ${upload} ${errorClass}`}
            onChange={this.handleChange}
            onBlur={this.isValid}
            type={type}
            list={list}
            accept="image/*"
            min={min}
            max={max}
            id={id}
          />
        )}
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
