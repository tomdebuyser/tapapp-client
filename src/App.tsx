import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Menu } from './_shared';
import Users from './users/Users';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <Menu />
      <Switch>
        <Route path="/users" component={Users} />
      </Switch>
    </div>
  );
};

export default App;
