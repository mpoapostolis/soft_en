import React, { Component } from "react";
import FormConstructor from "../../components/FormConstructor";
import * as styles from "./css";
const schema = [
  {
    errmsg: "this field cannot be empty",
    type: "",
    validator: "no-empty",
    field: "Name",
    label: "Activity Name"
  },

  {
    errmsg: "this field cannot be empty",
    type: "number",
    min: 0,
    max: 60,
    validator: "no-empty",
    field: "MinAge",
    label: "Min Age"
  },
  {
    errmsg: "this field cannot be empty",
    type: "number",
    min: 0,
    max: 60,
    validator: "no-empty",
    field: "MaxAge",
    label: "Max Age"
  },
  {
    errmsg: "this field cannot be empty",
    type: "textarea",
    validator: "no-empty",
    field: "Description",
    label: "Description"
  },
  {
    errmsg: "this field cannot be empty",
    type: "",
    validator: "no-empty",
    id: "autocomplete",
    field: "",
    label: ""
  },

  {
    errmsg: "this field cannot be empty",
    type: "",
    validator: "no-empty",
    field: "Tag",
    label: "Tag"
  },
  {
    errmsg: "this field cannot be empty",
    type: "",
    validator: "no-empty",
    field: "Price",
    label: "Price"
  },
  {
    errmsg: "this field cannot be empty",
    type: "",
    validator: "no-empty",
    field: "Duration",
    label: "Duration"
  },
  {
    type: "file",
    field: "",
    label: ""
  }
];

class CreateActivity extends Component {
  componentDidMount() {
    const { setTmpData } = this.props;
    const input = document.getElementById("autocomplete");
    const options = {
      types: ["address"],
      componentRestrictions: { country: "gr" }
    };
    const autocomplete = new window.google.maps.places.Autocomplete(
      input,
      options
    );

    window.google.maps.event.addListener(
      autocomplete,
      "place_changed",
      function() {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;
        const lat = place.geometry.location.lat();
        const long = place.geometry.location.lng();
        setTmpData({ lat, long });
      }
    );
  }
  render() {
    return (
      <FormConstructor
        action={this.props.createActivity}
        upload={true}
        firstMsg="Create new Activity"
        secondMsg=""
        btnMsg="Create"
        schema={schema}
        {...this.props}
      />
    );
  }
}

export default CreateActivity;
