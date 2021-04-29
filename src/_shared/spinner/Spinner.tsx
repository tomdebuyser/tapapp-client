import React, { FC, ReactNode } from 'react';
import classnames from 'classnames';
import './spinner.scss';

type Props = {
  children?: ReactNode;
  overlay?: boolean;
  size?: 'normal' | 'large';
  theme?: 'normal' | 'inversed';
};

const Spinner: FC<Props> = ({ children, overlay = false, size = overlay ? 'large' : 'normal', theme = 'normal' }) => {
  const spinner = (
    <div className={classnames('spinner-wrapper', `theme-${theme}`)}>
      <div className={classnames('spinner', `size-${size}`)}>
        {Array.from(Array(4).keys()).map(index => (
          <div key={index} />
        ))}
      </div>
      {children && <span className="spinner-content">{children}</span>}
    </div>
  );
  if (!overlay) return spinner;
  return <div className="spinner-overlay">{spinner}</div>;
};

export default Spinner;
