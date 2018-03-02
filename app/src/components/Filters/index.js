import React, { Component } from "react";
import Button from "material-ui/Button";
import * as styles from "./css";

class Filters extends Component {
  state = {
    Date: Date.now(),
    Min_price: 0,
    Max_price: 100,
    Distance: 5,
    visible: ""
  };

  handleClick = ({ currentTarget }) => {
    const { visible } = this.state;
    const key = currentTarget.placeholder;
    this.setState({ visible: visible === key ? "" : key });
  };

  handleChange = ({ currentTarget }) => {
    const { updateFilters } = this.props;
    const key = currentTarget.name;
    const value =
      key === "Date"
        ? new Date(currentTarget.value).getTime()
        : parseInt(currentTarget.value);
    this.setState({ [key]: value });
    updateFilters({ [key]: value });
  };

  isVisible = name => {
    const { visible } = this.state;
    return visible === name ? "active" : "";
  };

  handleSubmit = () => {
    const { updateFilters } = this.props;
    updateFilters(this.state);
  };

  render() {
    const { Min_price, Max_price, visible, Distance } = this.state;
    const { container, popUp, input, item, col } = styles;
    const { access_token } = this.props.account;

    return (
      <div className={container}>
        <div className={item}>
          <input
            className={input}
            name="Date"
            onChange={this.handleChange}
            type="date"
          />
        </div>
        <div className={item}>
          <input
            className={input}
            onClick={this.handleClick}
            placeholder="Distance"
            type="text"
          />
          <div className={`${popUp} ${this.isVisible("Distance")}`}>
            <div className={col}>
              <p>Distance:</p> {Distance}
              <input
                name="Distance"
                onChange={this.handleChange}
                type="range"
                min={1}
                max={100}
              />
            </div>
          </div>
        </div>
        <div className={item}>
          <input
            className={input}
            onClick={this.handleClick}
            placeholder="price"
            type="text"
          />
          <div className={`${popUp} ${this.isVisible("price")}`}>
            <div className={col}>
              <p>Min:</p> {Min_price}€
              <input
                name="Min_price"
                onChange={this.handleChange}
                type="range"
                min={0}
                max={100}
              />
            </div>

            <div className={col}>
              <p>Max:</p> {Max_price}€
              <input
                name="Max_price"
                onChange={this.handleChange}
                type="range"
                min={0}
                max={100}
              />
            </div>
          </div>
        </div>
        <Button onClick={this.handleSubmit}>Search</Button>
      </div>
    );
  }
}

export default Filters;
