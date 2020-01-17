import React, { useEffect, createContext, useMemo } from 'react';
import { Switch, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import AuthorizedRoute from './_routing/AuthorizedRoute';
import AuthorizedLayout from './_routing/AuthorizedLayout';
import UnauthorizedRoute from './_routing/UnauthorizedRoute';
import UnauthorizedLayout from './_routing/UnauthorizedLayout';
import { authActions } from './_store/actions';
import { authSelectors } from './_store/selectors';

export const PathnameContext = createContext('');

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isLoading = useSelector(authSelectors.isAuthenticateLoading);
  const initialPath = useMemo(() => pathname, []);

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
    <PathnameContext.Provider value={initialPath}>
      <Switch>
        <UnauthorizedRoute path="/auth" component={UnauthorizedLayout} />
        <AuthorizedRoute path="/" component={AuthorizedLayout} />
        <Redirect to="/" />
      </Switch>
    </PathnameContext.Provider>
  );
};

export default App;
