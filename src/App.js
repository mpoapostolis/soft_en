import React, { Component } from "react";
import Router from "./Routes";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./redux/actions";

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <main className="App">
        <Router {...this.props} />
      </main>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...actions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
