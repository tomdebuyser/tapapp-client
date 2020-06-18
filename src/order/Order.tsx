import React from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import OrderCompose from './compose/OrderCompose';
import OrderCheckout from './checkout/OrderCheckout';
import OrderFinished from './finished/OrderFinished';

const Order: React.FC = () => {
  const { url } = useRouteMatch();
  return (
    <div className="order">
      <Switch>
        <Route component={OrderCompose} path={`${url}/compose`} />
        <Route component={OrderCheckout} path={`${url}/checkout`} />
        <Route component={OrderFinished} path={`${url}/success`} />
        <Redirect to={`${url}/compose`} />
      </Switch>
    </div>
  );
};

export default Order;
