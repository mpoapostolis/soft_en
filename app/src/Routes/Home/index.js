import React, { Component } from "react";
import Button from "material-ui/Button";
import * as styles from "./css";

class Home extends Component {
  componentDidMount() {
    const { lat, lng } = this.props.account.coords;
    this.setState({ lat, lng, value: "" });
    const input = document.getElementById("autocomplete");
    const options = {
      types: ["(cities)"],
      componentRestrictions: { country: "gr" }
    };
    const autocomplete = new window.google.maps.places.Autocomplete(
      input,
      options
    );
    const setState = obj => this.setState(obj);
    window.google.maps.event.addListener(
      autocomplete,
      "place_changed",
      function() {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setState({ lat, lng });
      }
    );
  }

  componentWillUnmount() {
    this.props.clearTmp();
  }

  handleChange = ({ currentTarget }) => {
    this.setState({ value: currentTarget.value });
  };

  handleSubmit = () => {
    const {
      setTmpData,
      history: { push },
      account: { access_token }
    } = this.props;
    const { lat, lng, value } = this.state;
    setTmpData(this.state);
    const url = `/search?tag=${value}&lat=${lat}&lng=${lng}`;
    push(url);
  };

  clearValue = ({ currentTarget }) => {
    currentTarget.value = "";
  };

  render() {
    const { container, mainCont, btn, item, title, boxCont, inputCont } = styles;
    const { address } = this.props.account;

    return (
      <div className={container}>
        <div className={mainCont}>
          <div className={boxCont}>
            <h1 className={title}>FIND ACTIVITIES</h1>
            <div className={inputCont}>
              <input
                placeholder="Searh something"
                className={item}
                onChange={this.handleChange}
              />
              <input
                defaultValue={address}
                onFocus={this.clearValue}
                id="autocomplete"
                className={item}
              />
            </div>
            <Button
              className={btn}
              onClick={this.handleSubmit}
              variant="raised"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
