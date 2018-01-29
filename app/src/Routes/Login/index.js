import React, { Component } from "react";
import * as styles from "./css";
import TextField from "../../components/TextField";
import Button from "material-ui/Button";
// import { getMsg } from "../../msgs";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = ({ currentTarget }) => {
    const { value } = currentTarget;
    const key = currentTarget.getAttributeNode("dtype").value;
    this.setState(state => {
      state[key] = value;
      return state;
    });
  };

  render() {
    // const { account: { lang } } = this.props;
    const { infosCont, container, item, boxContainer, header, btn, btnCont } = styles;
    const { username, password } = this.state;
    return (
      <div className={container}>
        <div className={boxContainer}>
          <div className={header}>Login</div>
          <div className={infosCont}>
            <TextField
              className={item}
              value={username}
              dtype="username"
              label="UserName"
              onChange={this.handleChange}
            />
            <TextField
              className={item}
              value={password}
              dtype="password"
              type="password"
              label="Password"
              onChange={this.handleChange}
            />
          </div>
          <div className={btnCont}>
            <button className={btn}>submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
