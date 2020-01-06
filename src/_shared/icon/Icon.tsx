import React, { FC } from 'react';
import * as ICONS from '../../_assets/svg';
import './icon.scss';

interface Props {
  name: string;
  size?: number;
  disabled?: boolean;
  className?: string;
  label?: string;
  clickable?: boolean;
  id?: string;
  onClick?: (value: React.MouseEvent) => void;
}

const Icon: FC<Props> = ({ size, name, onClick, disabled, className, label, clickable, id, ...otherProps }) => {
  const Svg = ICONS[name];
  if (!Svg) return null;

  const sizeObject = size ? { width: `${size}rem`, height: `${size}rem` } : {};
  const IconComponent = (
    <i {...otherProps} className={`icon ${className}`} style={sizeObject}>
      <Svg {...sizeObject} />
    </i>
  );
  if (!clickable && !onClick) return IconComponent;
  return (
    <button
      id={id}
      type="button"
      aria-label={label}
      disabled={disabled}
      className="icon-button"
      onClick={value => onClick && onClick(value)}
      style={sizeObject}
    >
      {IconComponent}
    </button>
  );
};

Icon.defaultProps = {
  className: '',
};

export default Icon;
