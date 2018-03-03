import React, { Component } from "react";
import Button from "material-ui/Button";
import * as styles from "./css";

class Home extends Component {
  state = { value: "" };
  componentDidMount() {
    const { lat, lng } = this.props.filters;
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
      account: { access_token },
      updateCoords,
      getActivities
    } = this.props;
    const { lat, lng, value } = this.state;
    if (lat && lng) updateCoords({ Lat: lat, Long: lng });
    setTmpData(this.state);
    const url = `/search`;
    push(url);
  };

  clearValue = ({ currentTarget }) => {
    currentTarget.value = "";
  };

  render() {
    const {
      container,
      mainCont,
      btn,
      item,
      title,
      boxCont,
      inputCont
    } = styles;
    const { account: { address }, updateSearch } = this.props;
    const { value } = this.state;

    return (
      <div className={container}>
        <div className={mainCont}>
          <div className={boxCont}>
            <h1 className={title}>FIND ACTIVITIES</h1>
            <div className={inputCont}>
              <input
                placeholder="Searh something"
                className={item}
                onBlur={() => updateSearch(value)}
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
