import React, { Component } from "react";
import FormConstructor from "../../components/FormConstructor";

const schema = [...Array(10).keys()].map(i => ({
  errmsg: "this field cannot be empty",
  type: "date",
  field: `Date${i + 1}`,
  label: `Date`,
  field1: `Remaining${i + 1}`,
  label1: `Quantity`,
  type1: "number",
  min: 0
}));

class Listing extends Component {
  render() {
    return (
      <FormConstructor
        action={this.props.setListing}
        firstMsg="Choose Dates"
        secondMsg="and available Tickets"
        btnMsg="LISTING"
        schema={schema}
        {...this.props}
      />
    );
  }
}

export default Listing;
