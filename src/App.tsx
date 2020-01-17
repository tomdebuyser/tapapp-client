import React, { useEffect } from 'react';
import { Switch, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import AuthorizedRoute from './_routing/AuthorizedRoute';
import AuthorizedLayout from './_routing/AuthorizedLayout';
import UnauthorizedRoute from './_routing/UnauthorizedRoute';
import UnauthorizedLayout from './_routing/UnauthorizedLayout';
import { authActions } from './_store/actions';
import { authSelectors } from './_store/selectors';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isLoading = useSelector(authSelectors.isAuthenticateLoading);

  useEffect(() => {
    dispatch(new authActions.Authenticate({ pathname }));
  }, [dispatch]);

  if (isLoading)
    return (
      <div>
        <Loader size="large" active={isLoading} />
      </div>
    );

  return (
    <Switch>
      <UnauthorizedRoute path="/auth" component={UnauthorizedLayout} />
      <AuthorizedRoute path="/" component={AuthorizedLayout} />
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
