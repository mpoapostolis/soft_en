import React, { Component } from "react";
// import TextField from "../../components/TextField";
import * as styles from "./css.js";

class Login extends Component {
  state = {
    tab: "signup",
  };

  activeTab = tab => {
    return this.state.tab === tab ? "active" : "";
  };

  selectTab = ({ currentTarget: { dataset: { tab } } }) => this.setState({ tab });

  render() {
    const { container, box, info } = styles;
    return (
      <div className={container}>
        <div className={box}>
          <div className={info}>test</div>
        </div>
      </div>
    );
  }
}

export default Login;
