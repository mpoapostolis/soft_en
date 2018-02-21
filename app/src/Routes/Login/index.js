import React, { Component } from "react";
import TextField from "../../components/TextField";
import * as styles from "./css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    hide: true,
    tab: "login"
  };

  handlePassChange = ({ target }) =>
    this.setState(s => ({ password: target.value }));

  handleSaveInput = ({ target }) =>
    this.setState(s => ({ username: target.value }));

  handleEnter = evt => (evt.key === "Enter" ? this.handleSubmit() : null);

  handleSubmit = () => {
    const { callToLogin, history: { push } } = this.props;
    const { username, password } = this.state;
    callToLogin({ username, password }, push);
  };

  changeType = ({ currentTarget: { dataset: { tab } } }) => {
    this.setState({ tab });
  };

  handleSaveInput = ({
    currentTarget: { dataset: { info } },
    target: { value }
  }) => {
    this.setState({ [info]: value });
  };

  renderTab() {
    const { textCont, input, passwordClass } = styles;
    const { username, tab, password, hide } = this.state;
    const url = hide ? "/images/show.png" : "/images/hide.png";
    return tab === "login"
      ? [
          <div key={0} className={textCont}>
            <TextField
              data-info={`username`}
              value={username}
              onChange={this.handleSaveInput}
              label="Username"
              klass={input}
            />
          </div>,
          <div key={1} className={passwordClass}>
            <TextField
              data-info={`password`}
              value={password}
              onKeyPress={this.handleEnter}
              onChange={this.handlePassChange}
              label="Password"
              type={hide ? "password" : "text"}
              url={url}
              klass={input}
            />
          </div>
        ]
      : [
          [...Array(5)].map((e, i) => (
            <div key={i} className={textCont}>
              <TextField
                key={i}
                data-info={`info${i}`}
                value={this.state[`info${i}`]}
                onChange={this.handleSaveInput}
                label={`info${i}`}
                klass={input}
              />
            </div>
          ))
        ];
  }

  render() {
    const { errorMsg = `Please check your username and password` } = this.props;
    const { container, loginBox, btn, errorClass, logReg, choice } = styles;
    const { tab } = this.state;
    return (
      <div className={container}>
        <div className={loginBox}>
          <div className={logReg}>
            <div
              data-tab="login"
              onClick={this.changeType}
              className={`${choice} ${tab === "login" ? "active" : ""}`}
            >
              Login
            </div>
            <div
              data-tab="register"
              onClick={this.changeType}
              className={`${choice} ${tab === "register" ? "active" : ""}`}
            >
              Register
            </div>
          </div>
          {this.renderTab()}
          <button className={btn}>{tab.toUpperCase()}</button>
          {errorMsg ? (
            <div className={errorClass}>{errorMsg}</div>
          ) : (
            <div className={errorClass} />
          )}
        </div>
      </div>
    );
  }
}

export default Login;
