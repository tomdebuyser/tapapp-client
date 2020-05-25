import React, { FC, ReactNode } from 'react';
import classnames from 'classnames';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Icon from '../icon/Icon';
import './inputWrapper.scss';
import { IValidatorResponse } from '../../_utils/formValidation';

/**
 * This component serves as a wrapper around the specific input components. It contains some common input logic:
 *  - Show input label and icon
 *  - Show error message if needed
 *  - Show whether a field is required
 */

export type InputWrapperProps = {
  className?: string;
  disabled?: boolean;
  label?: string;
  labelIcon?: string;
  name: string;
  required?: boolean;
  validation?: IValidatorResponse;
};

const InputWrapper: FC<InputWrapperProps & { children: ReactNode; showError?: boolean }> = ({
  children,
  className,
  disabled,
  validation,
  label,
  labelIcon,
  name,
  required,
  showError,
}) => (
  <div className={classnames('input-wrapper', { disabled, error: showError, required }, className)}>
    {!!label && (
      <label className="input-wrapper-label" htmlFor={name}>
        {!!labelIcon && <Icon name={labelIcon} />}
        <span>{label}</span>
      </label>
    )}
    {children}
    <ErrorMessage isVisible={showError}>{validation?.message}</ErrorMessage>
  </div>
);

InputWrapper.defaultProps = {
  className: '',
};

export default InputWrapper;
