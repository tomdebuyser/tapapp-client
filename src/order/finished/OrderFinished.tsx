import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {};

const OrderFinished: FC<Props> = () => {
  const dispatch = useDispatch();

  // TODO: Redirect if empty state
  return (
    <div className="container">
      <span>OrderFinished works!</span>
    </div>
  );
};

export default OrderFinished;
