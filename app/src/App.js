import React, { Component } from "react";
import Router from "./Routes";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./redux/actions";

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Router {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
