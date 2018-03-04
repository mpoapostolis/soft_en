import React, { Component } from "react";
import * as styles from "./css";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import DatePicker from "react-datepicker";
import moment from "moment";

class Booking extends Component {
  state = {};
  componentDidMount() {
    const { ActivityID } = this.props.parent;
    const param = window.location.search.split(/\?|&/)[1];
    const id = ActivityID || param || "";
    fetch(`/activity/${id}`)
      .then(e => e.json())
      .then(activity => this.setState(activity));
  }

  handleChange = e => {
    this.setState({ value: e.utc().format("LLL") });
  };

  render() {
    const {
      inputCont,
      container,
      box,
      imageCont,
      infoCont,
      info,
      input,
      booking,
      btn
    } = styles;
    const {
      ActivityName,
      Description,
      Duration,
      Listings = [],
      Price,
      Pictures = [],
      owner = { CompanyName: "", Address: "" },
      value = ""
    } = this.state;
    const availableDate = Listings.map(o => o.availableDate);
    console.log(this.state);
    return (
      <div className={container}>
        <div className={imageCont}>
          {Pictures.map((path, i) => (
            <img key={i} src={`https://191.232.161.178:4001${path}`} alt="" />
          ))}
          <img
            src="https://a0.muscache.com/im/pictures/6310c62f-b893-450b-9d7b-f7de0fb752d1.jpg?aki_policy=large"
            alt=""
          />
          <img
            src="https://a0.muscache.com/im/pictures/6174781/a369cfe7_original.jpg?aki_policy=large"
            alt=""
          />
        </div>
        <div className={infoCont}>
          <div className={info}>
            <h1>{ActivityName}</h1>
            <label htmlFor="">
              {owner.CompanyName}
              {owner.Address}
            </label>
            <p>
              <br /> {Description}
            </p>
            <p>Duration: {Duration} minutes</p>
          </div>
          <div className={booking}>
            <h1 htmlFor="">{Price} ¥</h1>
            {Listings.map((obj, key) => (
              <div key={key} className={inputCont}>
                <div>{moment(obj.EventDate).format("LLL")}</div>
                <input
                  className={input}
                  placeholder={`max ${obj.Remaining}`}
                  type="number"
                  max={parseInt(obj.Remaining)}
                />
              </div>
            ))}
            <Button
              className={btn}
              onClick={this.handleSubmit}
              variant="raised"
            >
              BOOK
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Booking;
