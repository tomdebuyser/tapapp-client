import React, { FC } from 'react';
import { Input, InputOnChangeData } from 'semantic-ui-react';
import InputWrapper, { InputWrapperProps } from '../InputWrapper';
import { useInputError } from '../../../_hooks';

export interface InputFieldProps extends InputWrapperProps {
  autoComplete?: string;
  autoFocus?: boolean;
  icon?: string;
  normalize?: (value: string) => string;
  onChange: (value: string, name: string) => void;
  placeholder?: string;
  type?: string;
  value?: string;
}

const InputField: FC<InputFieldProps> = ({
  autoComplete,
  autoFocus,
  icon,
  normalize,
  onChange,
  placeholder,
  type,
  value,
  ...wrapperProps
}) => {
  const { disabled, errorMessage, name } = wrapperProps;
  const { setDirty, showError } = useInputError(errorMessage);

  return (
    <InputWrapper {...wrapperProps} showError={showError}>
      <Input
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        disabled={disabled}
        error={showError}
        icon={icon}
        name={name}
        onChange={(_, data: InputOnChangeData) => {
          const normalizedValue = normalize(data.value);
          onChange(normalizedValue, data.name);
          setDirty();
        }}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </InputWrapper>
  );
};

InputField.defaultProps = {
  normalize: (value: string) => value,
};

export default InputField;
