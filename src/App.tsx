import React, { useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthorizedRoute from './_routing/routes/AuthorizedRoute';
import AuthorizedLayout from './_routing/layouts/authorized/AuthorizedLayout';
import UnauthorizedRoute from './_routing/routes/UnauthorizedRoute';
import UnauthorizedLayout from './_routing/layouts/unauthorized/UnauthorizedLayout';
import { authActions } from './_store/actions';
import { authSelectors } from './_store/selectors';
import Toastify from './Toastify';
import { Spinner } from './_shared';
import { I18n } from './_translations';
import ModalWrapper from './modal/ModalWrapper';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(authSelectors.isAuthenticateLoading);

  useEffect(() => {
    dispatch(new authActions.Authenticate());
  }, []);

  if (isLoading) return <Spinner overlay>{I18n.labels.SHARED.LOADING_APPLICATION}</Spinner>;
  return (
    <>
      <Switch>
        <UnauthorizedRoute component={UnauthorizedLayout} path="/auth" />
        <AuthorizedRoute component={AuthorizedLayout} path="/" />
        <Redirect to="/" />
      </Switch>
      <ModalWrapper />
      <Toastify />
    </>
  );
};

export default App;
