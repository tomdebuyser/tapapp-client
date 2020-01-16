import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from '../_store/selectors';

const AuthorizedRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(authSelectors.user);

  return <Route {...rest} render={props => (user ? <Component {...props} /> : <Redirect to="/auth/login" />)} />;
};

export default AuthorizedRoute;
