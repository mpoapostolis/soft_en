import React, {Component} from 'react';
import FormConstructor from '../../components/FormConstructor';

const schema = [
  {
    errmsg: 'this field cannot be empty',
    type: '',
    validator: 'no-empty',
    field: 'username',
    label: 'username',
  },
  {
    errmsg: 'this field cannot be empty',
    type: 'password',
    validator: 'no-empty',
    field: 'password',
    label: 'password',
  },
];

const Login = props => (
  <FormConstructor
    firstMsg="Login"
    secondMsg="to continue"
    btnMsg="LOGIN"
    schema={schema}
    {...props}
  />
);

export default Login;
