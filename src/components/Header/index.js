import React, { Component } from "react";
import Avatar from "../Avatar";
import PopOver from "../PopOver";
import * as styles from "./css";
import { findDOMNode } from "react-dom";

class Header extends Component {
  state = {
    open: false,
    anchorEl: null,
    anchorOriginVertical: "bottom",
    anchorOriginHorizontal: "center",
    transformOriginVertical: "top",
    transformOriginHorizontal: "center",
  };

  handleClickButton = () => {
    this.setState({
      open: true,
      anchorEl: findDOMNode(this.lang),
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { account: { lang }, history, role = "Guest" } = this.props;
    const { container, item, langs } = styles;
    return (
      <div className={container}>
        <div
          onClick={this.handleClickButton}
          className={`${item} ${langs}`}
          ref={node => {
            this.lang = node;
          }}>
          <img alt=":)" src={`/images/${lang}.png`} />
          <label>{lang}</label> ▼
        </div>
        <Avatar className={item} role={role} src={undefined} />
        <button className={item} onClick={() => history.push("/login")}>
          Login
        </button>
        <PopOver {...this.state} {...this.props} handleRequestClose={this.handleRequestClose} />
      </div>
    );
  }
}
export default Header;
