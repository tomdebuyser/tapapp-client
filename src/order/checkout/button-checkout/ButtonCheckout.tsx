import React, { FC, ReactNode } from 'react';
import { Icon } from '../../../_shared';
import './buttonCheckout.scss';

type Props = {
  icon: string;
  label: string;
  logo?: ReactNode;
  onClick?: () => void;
};

const ButtonCheckout: FC<Props> = ({ icon, label, logo, onClick }) => {
  return (
    <button className="button-checkout" onClick={() => onClick?.()}>
      <div className="left-wrapper">
        <Icon name={icon} />
        <span>{label}</span>
      </div>
      <div className="provider-logo">{logo}</div>
    </button>
  );
};

export default ButtonCheckout;
