import React, { ReactNode } from 'react';
import classnames from 'classnames';
import './badge.scss';

type Props = {
  children: ReactNode;
  className?: string;
  negative?: boolean;
};

const Badge: React.FC<Props> = ({ children, negative, className }) => {
  return <div className={classnames('badge', className, { negative })}>{children}</div>;
};

Badge.defaultProps = {
  className: '',
  negative: false,
};

export default Badge;
