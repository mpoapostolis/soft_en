import React from 'react';
import {Redirect} from 'react-router-dom';

const AuthWrapper = props => {
  const Component = props.component;
  const {account: {access_token}, path} = props; // eslint-disable-line
  const pathname = '/register';
  return access_token ? <Component {...props} /> : <Redirect to={pathname} />;
};

export default AuthWrapper;
