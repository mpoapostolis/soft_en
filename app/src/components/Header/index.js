import React, { Component } from "react";
import { withRouter } from "react-router";
import * as styles from "./css";

class Header extends Component {
  changePath = ({ currentTarget }) => {
    const { push } = this.props.history;
    const value = currentTarget.textContent.toLowerCase();
    push(value);
  };

  goHome = () => {
    const { push } = this.props.history;
    push("/");
  };

  render() {
    const { container, logo, info, redirect } = styles;
    return (
      <div className={container}>
        <img
          onClick={this.goHome}
          className={logo}
          src="/images/logo.svg"
          alt=":)"
        />
        <div className={info}>
          <div className={redirect} onClick={this.changePath}>
            Register
          </div>
          <div className={redirect} onClick={this.changePath}>
            Login
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
