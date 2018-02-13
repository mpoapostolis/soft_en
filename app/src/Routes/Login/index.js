import React, { Component } from "react";
import TextField from "../../components/TextField";
import * as styles from "./css";
import Button from "material-ui";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleEnter = evt => (evt.key === "Enter" ? this.handleSubmit() : null);

  handleSubmit = () => {
    const { callToLogin, history: { push } } = this.props;
    const { username, password } = this.state;
    console.log("asdsd");

    // callToLogin({ username, password }, push);
  };

  handleSaveInput = ({
    currentTarget: { dataset: { info } },
    target: { value }
  }) => {
    this.setState({ [info]: value });
  };

  render() {
    const { errorMsg = `Please check your username and password` } = this.props;
    const { container, item, loginBox, label, btn } = styles;
    const { username, password } = this.state;
    console.log(this.state);

    return (
      <div className={container}>
        <div className={loginBox}>
          <div className={item}>
            <img src="/images/logo.svg" />
          </div>
          <div className={`${item} label`}>
            <label className={label}>{`Sign in`}</label>
            <p>to continue to goKiddo</p>
          </div>
          <div className={item}>
            <TextField
              autoFocus
              onChange={this.handleSaveInput}
              data-info={"username"}
              value={username}
              label="username"
            />
          </div>
          <div className={item}>
            <TextField
              onChange={this.handleSaveInput}
              data-info={"password"}
              onKeyPress={this.handleEnter}
              value={password}
              label="password"
              type="password"
            />
          </div>
          <div className={`${item} btn`}>
            <button className={btn}>LOGIN</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
