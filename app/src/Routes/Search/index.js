import React, { Component } from "react";
import Button from "material-ui/Button";
import Map from "../../components/Map";
import Card from "../../components/Card";
import TextField from "../../components/TextField";
import Filters from "../../components/Filters";
import Dialog from "../../components/Dialog";
import * as styles from "./css";

class Search extends Component {
  componentDidMount() {
    const { getActivities } = this.props;
    getActivities();
  }
  componentWillUnmount() {
    this.props.clearTmp;
  }

  handleChange = ({ currentTarget }) => {
    this.setState({ value: currentTarget.value });
  };

  handleSubmit = () => {
    const { setTmpData, push } = this.props;
    setTmpData(this.state);
    push("/search");
  };

  clearValue = ({ currentTarget }) => {
    currentTarget.value = "";
  };

  render() {
    const { container, filter, main, outCont, mapCont, activityCont } = styles;
    const { data = [] } = this.props.activities;
    return (
      <div>
        <div className={container}>
          <div className={filter}>
            <Filters {...this.props} />
          </div>
          <div className={main}>
            <div className={outCont}>
              <div className={activityCont}>
                {data.map((obj, key) => <Card {...obj} key={key} />)}
              </div>
            </div>
            <div className={mapCont}>
              <Map isMarkerShown {...this.props} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
