import React, { useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import AuthorizedRoute from './_routing/routes/AuthorizedRoute';
import AuthorizedLayout from './_routing/layouts/authorized/AuthorizedLayout';
import UnauthorizedRoute from './_routing/routes/UnauthorizedRoute';
import UnauthorizedLayout from './_routing/layouts/unauthorized/UnauthorizedLayout';
import ReduxDelegatedModal from './modal/ReduxDelegatedModal';
import { authActions } from './_store/actions';
import { authSelectors } from './_store/selectors';
import Toastify from './Toastify';
import { I18n } from './_translations';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(authSelectors.isAuthenticateLoading);
  const locale = useSelector(authSelectors.locale);
  const isDevMode = useSelector(authSelectors.isDevMode);

  useEffect(() => {
    dispatch(new authActions.Authenticate());
  }, [dispatch]);

  /**
   * This useEffect hook is here to make the app re-render on a locale change
   */
  useEffect(() => {
    if (locale) I18n.setLocale(locale);
  }, [locale]);

  /**
   * This useEffect hook is here to make the app re-render on a dev mode change
   */
  useEffect(() => {
    if (isDevMode) I18n.setDevMode(isDevMode);
  }, [isDevMode]);

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
      <Toastify />
    </>
  );
};

export default App;
