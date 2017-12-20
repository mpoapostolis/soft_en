import React, { Component } from "react";
import Router from "./Routes";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./redux/actions";
import Header from "./components/Header";

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <main className="App">
        <Header {...this.props} />
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
