import React, { Component } from "react";
import Router from "./Routes";
import Header from "./components/Header";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./redux/actions";
import { css } from "emotion";

class App extends Component {
  componentDidMount() {
    if (navigator.geolocation) {
      console.log("asdsd");
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
    return (
      <div>
        <Header {...this.props} />
        <main
          className={css`
            padding-top: 70px;
          `}
        >
          <Router {...this.props} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
