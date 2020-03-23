import React, { FC } from 'react';
import { Dropdown as SemanticDropdown, InputOnChangeData } from 'semantic-ui-react';
import BaseInput, { BaseInputProps } from '../Input';
import { useInputError } from '../../../_hooks';

export interface DropdownOption {
  key?: string;
  text: string;
  value: string;
}

interface Props extends BaseInputProps {
  multiple?: boolean;
  normalize?: (value: string) => string;
  onChange: (value: string | string[], name: string) => void;
  options: DropdownOption[] | [];
  placeholder?: string;
  value: string | string[];
}

const Dropdown: FC<Props> = ({ multiple, normalize, onChange, options, placeholder, value, ...baseProps }) => {
  const { disabled, errorMessage, name } = baseProps;
  const { setDirty, showError } = useInputError(errorMessage);

  return (
    <BaseInput {...baseProps} showError={showError}>
      <SemanticDropdown
        disabled={disabled}
        error={showError}
        multiple={multiple}
        name={name}
        onChange={(_, data: InputOnChangeData) => {
          const normalizedValue = normalize(data.value);
          onChange(normalizedValue, data.name);
          setDirty();
        }}
        options={options || []}
        placeholder={placeholder}
        selection
        value={value}
      />
    </BaseInput>
  );
};

Dropdown.defaultProps = {
  normalize: (value: string) => value,
};

export default Dropdown;
