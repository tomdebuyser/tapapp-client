import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const UnauthorizedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (!localStorage.getItem('LOGGED_IN') ? <Component {...props} /> : <Redirect to="/" />)} />
  );
};

export default UnauthorizedRoute;
