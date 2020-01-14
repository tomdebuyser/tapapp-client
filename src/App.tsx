import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import AuthorizedRoute from './_routing/AuthorizedRoute';
import AuthorizedLayout from './_routing/AuthorizedLayout';
import UnauthorizedRoute from './_routing/UnauthorizedRoute';
import UnauthorizedLayout from './_routing/UnauthorizedLayout';

const App: React.FC = () => {
  return (
    <Switch>
      <UnauthorizedRoute path="/auth" component={UnauthorizedLayout} />
      <AuthorizedRoute path="/" component={AuthorizedLayout} />
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
