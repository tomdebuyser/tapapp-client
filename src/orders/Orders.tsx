import React from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import OrdersUnfinished from './unfinished/OrdersUnfinished';

const Orders: React.FC = () => {
  const { url } = useRouteMatch();
  return (
    <div className="orders">
      <Switch>
        <Route component={OrdersUnfinished} path={`${url}/unfinished`} />
        <Redirect to={`${url}/unfinished`} />
      </Switch>
    </div>
  );
};

export default Orders;
