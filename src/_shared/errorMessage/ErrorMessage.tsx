import React, { FC, ReactNode } from 'react';
import classnames from 'classnames';
import './errorMessage.scss';
import Icon from '../icon/Icon';

interface Props {
  children: ReactNode;
  isGlobal?: boolean;
  isVisible: boolean;
}

const ErrorMessage: FC<Props> = ({ children, isGlobal, isVisible }) => {
  if (isVisible && !!children)
    return (
      <div className={classnames('error-message', { global: isGlobal })}>
        {isGlobal && <Icon name="SvgAlert" size={2.5} />}
        <span>{children}</span>
      </div>
    );
  return null;
};

ErrorMessage.defaultProps = {
  isGlobal: false,
};

export default ErrorMessage;
