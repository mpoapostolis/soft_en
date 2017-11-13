import React, { Component } from "react";
import Router from "./Routes";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./redux/actions";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "INIT"
    };
  }

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
  return {
    account: state.account,
    tmpData: state.tmpData,
    filters: state.filters
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      callToLogin: actions.callToLogin
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
