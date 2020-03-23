import React, { FC, ReactNode } from 'react';
import classnames from 'classnames';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Icon from '../icon/Icon';
import './input.scss';

/**
 * This component serves as a wrapper around the specific input components. It contains some common input logic:
 *  - Show input label and icon
 *  - Show error message if needed
 *  - Show whether a field is required
 */

export interface BaseInputProps {
  className?: string;
  disabled?: boolean;
  errorMessage?: string;
  label?: string;
  labelIcon?: string;
  name: string;
  required?: boolean;
}

const BaseInput: FC<BaseInputProps & { children: ReactNode; showError?: boolean }> = ({
  children,
  className,
  disabled,
  errorMessage,
  label,
  labelIcon,
  name,
  required,
  showError,
}) => (
  <div className={classnames('input-wrapper', className, { disabled, error: showError, required })}>
    {!!label && (
      <label htmlFor={name}>
        {!!labelIcon && <Icon name={labelIcon} />}
        <span>{label}</span>
      </label>
    )}
    {children}
    <ErrorMessage isVisible={showError}>{errorMessage}</ErrorMessage>
  </div>
);

BaseInput.defaultProps = {
  className: '',
};

export default BaseInput;
