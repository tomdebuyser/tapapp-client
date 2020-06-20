import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {};

const OrderCheckoutCash: FC<Props> = () => {
  const dispatch = useDispatch();

  return <div className="container">OrderCheckoutCash works!</div>;
};

export default OrderCheckoutCash;
