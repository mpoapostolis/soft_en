import React, { Component } from "react";
import Router from "./Routes";
import Header from "./components/Header";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./redux/actions";

class App extends Component {
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getPosition);
    }
  }

  codeLatLng = (latitude, longitude) => {
    const { updateAdress } = this.props;
    const geocoder = new window.google.maps.Geocoder();
    const latlng = new window.google.maps.LatLng(latitude, longitude);
    geocoder.geocode({ latLng: latlng }, function(results, status) {
      if (status == window.google.maps.GeocoderStatus.OK && results[1]) {
        const address = results[1].formatted_address;
        updateAdress(address);
      } else console.error("error");
    });
  };

  getPosition = position => {
    const { updateCoords } = this.props;
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    updateCoords({ latitude, longitude });
    this.codeLatLng(latitude, longitude);
  };

  render() {
    return <Router {...this.props} />;
  }
}

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
