import React, { FC, ReactNode } from 'react';
import classnames from 'classnames';
import './errorMessage.scss';
import Icon from '../icon/Icon';

interface Props {
  children: ReactNode;
  global?: boolean;
  isVisible: boolean;
}

const ErrorMessage: FC<Props> = ({ children, global, isVisible }) => {
  if (isVisible && !!children)
    return (
      <div className={classnames('error-message', { global })}>
        {global && <Icon name="SvgAlert" size={2.5} />}
        <span>{children}</span>
      </div>
    );
  return null;
};

ErrorMessage.defaultProps = {
  global: false,
};

export default ErrorMessage;
