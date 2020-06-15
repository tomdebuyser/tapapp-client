import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {};

const OrderCheckout: FC<Props> = () => {
  const dispatch = useDispatch();

  // TODO: Redirect if empty state
  return (
    <div className="container">
      <span>OrderCheckout works!</span>
    </div>
  );
};

export default OrderCheckout;
