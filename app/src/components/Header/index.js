import React, { Component } from "react";
import * as styles from "./css";

class Header extends Component {
  render() {
    const { container } = styles;
    return (
      <div className={container}>
        <h1>header</h1>
      </div>
    );
  }
}

export default Header;
