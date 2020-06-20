import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {};

const OrderCheckoutMerge: FC<Props> = () => {
  const dispatch = useDispatch();

  return <div className="container">OrderCheckoutMerge works!</div>;
};

export default OrderCheckoutMerge;
