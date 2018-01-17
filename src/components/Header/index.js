import React, { Component } from "react";
import Avatar from "../Avatar";
import PopOver from "../PopOver";
import * as styles from "./css";
import { getMsg } from "../../msgs";
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
    const { account: { lang }, role = "Guest", history: { push } } = this.props;
    const { img, container, item, langs, left, right } = styles;
    const showRegLinks = role === "Guest";
    return (
      <div className={container}>
        <code className={left} onClick={() => push("/")}>
          GoKiddo
        </code>
        <div className={right}>
          {showRegLinks && (
            <label className={item} onClick={() => push("register")}>
              {getMsg(lang, "Register")}
            </label>
          )}
          {showRegLinks && (
            <label className={item} onClick={() => push("login")}>
              {getMsg(lang, "Login")}
            </label>
          )}
          <div
            onClick={this.handleClickButton}
            className={`${item} ${langs}`}
            ref={node => {
              this.lang = node;
            }}>
            <img alt=":)" className={img} src={`/images/${lang}.png`} />
            <label>{lang} ▾</label>
          </div>
          <Avatar className={item} role={role} src={undefined} />
          <PopOver {...this.state} {...this.props} handleRequestClose={this.handleRequestClose} />
        </div>
      </div>
    );
  }
}
export default Header;
