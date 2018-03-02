import React, { Component } from "react";
import { withRouter } from "react-router";
import Menu, { MenuItem } from "material-ui/Menu";
import Button from "material-ui/Button";
import * as styles from "./css";

class Header extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  changePath = ({ currentTarget }) => {
    const { push } = this.props.history;
    const value = currentTarget.textContent.toLowerCase();
    push(value);
  };

  handleEnter = evt => {
    const { getActivities } = this.props;
    if (evt.key === "Enter") return getActivities();
  };

  goHome = () => {
    const { push } = this.props.history;
    push("/");
  };

  guest = () => {
    const { info, redirect } = styles;
    return (
      <div className={info}>
        <Button className={redirect} onClick={this.changePath}>
          Register
        </Button>
        <Button className={redirect} onClick={this.changePath}>
          Login
        </Button>
      </div>
    );
  };

  accountInfo = () => {
    const { account } = styles;
    const { anchorEl } = this.state;
    const { account: { name }, logout } = this.props;
    return (
      <div className={account}>
        <img
          src="/images/account.png"
          alt=":)"
          onClick={this.handleClick}
          aria-owns={anchorEl ? "simple-menu" : null}
          aria-haspopup="true"
        />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  };

  render() {
    const { container, input, logo, info, redirect, rightSide } = styles;
    const { account: { access_token }, updateSearch } = this.props;
    const showSearch = window.location.pathname !== "/";
    return (
      <div className={container}>
        <div className={rightSide}>
          <img
            onClick={this.goHome}
            className={logo}
            src="/images/logo.png"
            alt=":)"
          />
          {showSearch && (
            <input
              className={input}
              onChange={e => updateSearch(e.target.value)}
              onKeyDown={this.handleEnter}
              placeholder="🔎 Search"
              type="text"
            />
          )}
        </div>
        {access_token ? this.accountInfo() : this.guest()}
      </div>
    );
  }
}

export default withRouter(Header);
