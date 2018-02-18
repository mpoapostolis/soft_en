import React, { Component } from "react";
import FormConstructor from "../../components/FormConstructor";

let parrentSchema = [
  {
    errmsg: "select one of from the list",
    type: "select",
    validator: "select",
    field: "type",
    label: "Type",
    list: ["owner", "parrent"]
  },
  {
    errmsg: "email format must be xx@xxx.xxx",
    type: "email",
    validator: "email",
    field: "email",
    label: "Email"
  },
  {
    errmsg: "this field cannot be empty",
    type: "text",
    validator: "no-empty",
    field: "address",
    label: "Address"
  },
  {
    errmsg: "Password does not match the confirm password",
    type: "password",
    validator: "no-empty",
    field: "password1",
    label: "Password"
  },
  {
    errmsg: "Password does not match the confirm password",
    type: "password",
    validator: "password",
    field: "password2",
    label: "Confirm password"
  }
];
const extraOwnerInfo = [
  {
    errmsg: "this field cannot be empty",
    type: "",
    validator: "no-empty",
    field: "iban",
    label: "IBAN"
  },
  {
    errmsg: "this field cannot be empty",
    type: "",
    validator: "no-empty",
    field: "bic",
    label: "BIC"
  },
  {
    errmsg: "this field cannot be empty",
    type: "",
    validator: "no-empty",
    field: "swift",
    label: "SWIFT"
  },
  {
    errmsg: "this field cannot be empty",
    type: "",
    validator: "no-empty",
    field: "taxNumber",
    label: "Tax Number"
  }
];

const Register = props => {
  const { type } = props.tmpData;
  const schema =
    type === "owner" ? [...parrentSchema, ...extraOwnerInfo] : parrentSchema;
  return (
    <FormConstructor
      firstMsg="Sign up"
      secondMsg="to continue"
      btnMsg="SIGNUP"
      schema={schema}
      {...props}
    />
  );
};

export default Register;
