import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../_store/selectors';

const AuthorizedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector(authSelectors.isLoggedIn);
  const { pathname } = useLocation();

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? <Component {...props} /> : <Redirect to={{ pathname: '/auth/login', state: { pathname } }} />
      }
    />
  );
};

export default AuthorizedRoute;
