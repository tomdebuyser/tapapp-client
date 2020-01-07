import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Menu } from './_shared';
import Users from './users/Users';
import './App.scss';
import CreateUser from './users/createUser/CreateUser';

const App: React.FC = () => {
  return (
    <div className="App">
      <Menu />
      <Switch>
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/create" component={CreateUser} />
        <Redirect to="/users" />
      </Switch>
    </div>
  );
};

export default App;
