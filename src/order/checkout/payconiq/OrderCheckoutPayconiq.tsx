import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {};

const OrderCheckoutPayconiq: FC<Props> = () => {
  const dispatch = useDispatch();

  return <div className="container">OrderCheckoutPayconiq works!</div>;
};

export default OrderCheckoutPayconiq;
