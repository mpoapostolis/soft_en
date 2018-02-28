import React, {Component} from 'react';
import FormConstructor from '../../components/FormConstructor';

let parrentSchema = [
  {
    errmsg: 'select one of from the list',
    type: 'select',
    validator: 'select',
    field: 'Role',
    label: 'Role',
    list: ['Owner', 'Parent'],
  },
  {
    errmsg: 'email format must be xx@xxx.xxx',
    type: 'email',
    validator: 'email',
    field: 'Email',
    label: 'Email',
  },
  {
    errmsg: 'this field cannot be empty',
    type: 'text',
    validator: 'no-empty',
    field: 'Phone',
    label: 'Phone',
  },
  {
    errmsg: 'this field cannot be empty',
    type: 'text',
    validator: 'no-empty',
    field: 'Address',
    label: 'Address',
  },
  {
    errmsg: 'this field cannot be empty',
    type: 'text',
    validator: 'no-empty',
    field: 'Name',
    label: 'Name',
  },
  {
    errmsg: 'Password does not match the confirm password',
    type: 'password',
    validator: 'no-empty',
    field: 'Password',
    label: 'Password',
  },
];
const extraOwnerInfo = [
  {
    errmsg: 'this field cannot be empty',
    type: '',
    validator: 'no-empty',
    field: 'IBAN',
    label: 'IBAN',
  },
  {
    errmsg: 'this field cannot be empty',
    type: '',
    validator: 'no-empty',
    field: 'CompanyName',
    label: 'Company Name',
  },
  {
    errmsg: 'this field cannot be empty',
    type: '',
    validator: 'no-empty',
    field: 'BIC',
    label: 'BIC',
  },
  {
    errmsg: 'this field cannot be empty',
    type: '',
    validator: 'no-empty',
    field: 'SWIFT',
    label: 'SWIFT',
  },
  {
    errmsg: 'this field cannot be empty',
    type: '',
    validator: 'no-empty',
    field: 'TaxNumber',
    label: 'Tax Number',
  },
];

const Register = props => {
  const {type} = props.tmpData;
  const schema =
    type === 'owner' ? [...parrentSchema, ...extraOwnerInfo] : parrentSchema;
  return (
    <FormConstructor
      action={props.register}
      firstMsg="Sign up"
      secondMsg="to continue"
      btnMsg="SIGNUP"
      schema={schema}
      {...props}
    />
  );
};

export default Register;
