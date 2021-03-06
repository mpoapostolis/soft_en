import React, { Component } from "react";
import Router from "./Routes";
import Header from "./components/Header";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./redux/actions";
import "react-table/react-table.css";
import "react-datepicker/dist/react-datepicker.css";
import uniq from "ramda/src/uniq";
const i18n = require("./msgs.json");

let tmp = [];
class App extends Component {
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getPosition);
    }
  }
  componentWillReceiveProps() {}

  t = key => window.i18nOBJ.key || key;

  getPosition = position => {
    const { updateCoords } = this.props;
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;

    updateCoords({ Lat: lat, Long: lng });
    this.codeLatLng(lat, lng);
  };

  t = key => {
    if (i18n[key]) return i18n[key][this.props.account.lang];
    else {
      tmp = uniq(tmp);
      tmp.push(key);
      return key;
    }
  };

  codeLatLng = (lat, lng) => {
    const { updateAdress } = this.props;
    const geocoder = new window.google.maps.Geocoder();
    const latlng = new window.google.maps.LatLng(lat, lng);
    geocoder.geocode({ latLng: latlng }, function(results, status) {
      if (status == window.google.maps.GeocoderStatus.OK && results[1]) {
        const address = results[1].formatted_address;
        updateAdress(address);
      } else console.error("error");
    });
  };

  render() {
    return <Router {...this.props} t={this.t} />;
  }
}

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
