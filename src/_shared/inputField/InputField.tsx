import React, { FC, ChangeEvent } from 'react';
import { Input, InputOnChangeData } from 'semantic-ui-react';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Icon from '../icon/Icon';
import { useInputError } from '../../_hooks';

import './inputField.scss';

export interface InputFieldProps {
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  fluid?: boolean;
  autoFocus?: boolean;
  label?: string;
  labelIcon?: string;
  className?: string;
  name?: string;
  normalize?: (value: string) => string;
  onChange?: (value: string, name: string) => void;
  placeholder?: string;
  type?: string;
  value?: string;
  icon?: string;
}

const InputField: FC<InputFieldProps> = ({
  autoFocus,
  className,
  label,
  labelIcon,
  error,
  errorMessage,
  onChange,
  normalize,
  icon,
  ...props
}) => {
  const inputWrapperRef = React.createRef<HTMLDivElement>();
  const { showError, setDirty } = useInputError(error);

  return (
    <div className={`input-wrapper ${className}`} ref={inputWrapperRef}>
      {!!label && (
        <label htmlFor={props.name}>
          {!!labelIcon && <Icon name={labelIcon} />}
          <span>{label}</span>
        </label>
      )}
      <Input
        {...props}
        icon={icon}
        id={props?.name}
        autoFocus={autoFocus}
        error={showError}
        onChange={(event: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
          const normalizedValue = normalize(data?.value);
          onChange(normalizedValue, data?.name);
          setDirty();
        }}
      />
      <ErrorMessage isVisible={showError}>{errorMessage}</ErrorMessage>
    </div>
  );
};

InputField.defaultProps = {
  className: '',
  normalize: (value: string) => value,
};

export default InputField;
