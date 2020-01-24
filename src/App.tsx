import React, { useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import AuthorizedRoute from './_routing/routes/AuthorizedRoute';
import AuthorizedLayout from './_routing/layouts/AuthorizedLayout';
import UnauthorizedRoute from './_routing/routes/UnauthorizedRoute';
import UnauthorizedLayout from './_routing/layouts/UnauthorizedLayout';
import ReduxDelegatedModal from './modal/ReduxDelegatedModal';
import { authActions } from './_store/actions';
import { authSelectors } from './_store/selectors';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(authSelectors.isAuthenticateLoading);

  useEffect(() => {
    dispatch(new authActions.Authenticate());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div>
        <Loader active={isLoading} size="large" />
      </div>
    );
  }

  return (
    <>
      <Switch>
        <UnauthorizedRoute component={UnauthorizedLayout} path="/auth" />
        <AuthorizedRoute component={AuthorizedLayout} path="/" />
        <Redirect to="/" />
      </Switch>
      <ReduxDelegatedModal />
    </>
  );
};

export default App;
