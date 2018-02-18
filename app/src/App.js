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

  getPosition = position => {
    const { updateCoords } = this.props;
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    updateCoords({ latitude, longitude });
  };

  render() {
    return <Router {...this.props} />;
  }
}

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
