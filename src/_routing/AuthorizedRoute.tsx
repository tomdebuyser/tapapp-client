import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthorizedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (localStorage.getItem('LOGGED_IN') ? <Component {...props} /> : <Redirect to="/auth/login" />)}
    />
  );
};

export default AuthorizedRoute;
