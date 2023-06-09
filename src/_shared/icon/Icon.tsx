import React, { FC } from 'react';
import classnames from 'classnames';
import * as ICONS from '../../_assets/svg';
import './icon.scss';

type Props = {
  className?: string;
  clickable?: boolean;
  disabled?: boolean;
  id?: string;
  label?: string;
  name: string;
  onClick?: (value: React.MouseEvent) => void;
  size?: number;
};

const Icon: FC<Props> = ({ size, name, onClick, disabled, className, label, clickable, id, ...otherProps }) => {
  const Svg = ICONS[name];
  if (!Svg) return null;

  const sizeObject = size ? { height: `${size}rem`, width: `${size}rem` } : {};
  const IconComponent = (
    <i {...otherProps} className={classnames('icon', className)} style={sizeObject}>
      <Svg {...sizeObject} />
    </i>
  );
  if (!clickable && !onClick) return IconComponent;
  return (
    <button
      aria-label={label}
      className="plain"
      disabled={disabled}
      id={id}
      onClick={value => onClick && onClick(value)}
      style={sizeObject}
      type="button"
    >
      {IconComponent}
    </button>
  );
};

Icon.defaultProps = {
  className: '',
};

export default Icon;
