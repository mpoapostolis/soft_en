import React, { Component } from "react";
import * as styles from "./css";
// import { getMsg } from "../../msgs";

class Home extends Component {
  isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  getCords = pos => {
    const { setCoords } = this.props;
    const coords = pos.coords;
    setCoords({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  componentDidMount() {
    navigator.geolocation.watchPosition(this.getCords); // get positions
    if (this.isMobile()) setInterval(navigator.geolocation.watchPosition(this.getCords), 1000 * 60); // if mobile get positions everyMinute
  }

  render() {
    // const { account: { lang } } = this.props;
    const { container } = styles;
    return (
      <div className={container}>
        <div> test </div>
      </div>
    );
  }
}

export default Home;
