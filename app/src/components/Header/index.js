import React, { Component } from "react";
import { withRouter } from "react-router";
import Menu, { MenuItem } from "material-ui/Menu";
import Button from "material-ui/Button";
import Avatar from "material-ui/Avatar";
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
    const { push } = this.props.history;
    const { getActivities } = this.props;
    if (evt.key === "Enter")
      return Promise.resolve(push("/search")).then(getActivities());
  };

  goHome = () => {
    const { push } = this.props.history;
    push("/");
  };

  guest = () => {
    const { info, redirect } = styles;
    const { t } = this.props
    return (
      <div className={info}>
        <Button className={redirect} onClick={this.changePath}>
          {t("Register")}
        </Button>
        <Button className={redirect} onClick={this.changePath}>
          {t("Login")}
        </Button>
      </div>
    );
  };

  accountInfo = () => {
    const { account } = styles;
    const { anchorEl } = this.state;
    const {
      account: { name },
      logout,
      history: { push },
      account: { Role }
    } = this.props;
    const items = [
      {
        name: "Profile",
        action: () => push( Role ==='Owner' ? "/owner-profile" : "/parent-profile")
      },
      {
        name: "Logout",
        action: () => Promise.resolve(logout()).then(push("/"))
      }
    ];
    if (Role === "Owner")
      items.splice(1, 0, {
        name: "New Activity",
        action: () => push("/new-activity")
      });
    if (Role === "Owner") items.push({
      name: "Statistics",
      action: () => push("/statistics")
    
    })
      
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
          {items.map((obj, key) => (
            <MenuItem
              key={key}
              onClick={() => {
                obj.action();
                this.handleClose();
              }}
            >
              {obj.name}
            </MenuItem>
          ))}
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
