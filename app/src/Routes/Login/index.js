import React, { Component } from "react";
import FormConstructor from "../../components/FormConstructor";

const schema = [
  {
    errmsg: "this field cannot be empty",
    type: "",
    validator: "no-empty",
    field: "Email",
    label: "Email"
  },
  {
    errmsg: "this field cannot be empty",
    type: "Password",
    validator: "no-empty",
    field: "Password",
    label: "Password"
  }
];

const Login = props => (
  <FormConstructor
    action={props.callToLogin}
    firstMsg="Login"
    secondMsg="to continue"
    btnMsg="LOGIN"
    schema={schema}
    {...props}
  />
);

export default Login;
