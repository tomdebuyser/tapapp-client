import React, { FC } from 'react';
import { Dropdown as SemanticDropdown, InputOnChangeData } from 'semantic-ui-react';
import InputWrapper, { InputWrapperProps } from '../InputWrapper';
import { useInputError } from '../../../_hooks';
import './dropdown.scss';

export type DropdownOption = {
  className?: string;
  key?: string;
  text: string;
  value: string;
};

type Props = InputWrapperProps & {
  multiple?: boolean;
  normalize?: (value: string) => string;
  onChange: (value: string | string[], name: string) => void;
  options: DropdownOption[] | [];
  placeholder?: string;
  value: string | string[];
};

const Dropdown: FC<Props> = ({ multiple, normalize, onChange, options, placeholder, value, ...wrapperProps }) => {
  const { disabled, validation, name } = wrapperProps;
  const { setDirty, showError } = useInputError(validation);

  let allOptions: DropdownOption[] = options || [];
  if (value && !multiple) {
    allOptions = [{ className: 'empty-item', key: placeholder, text: placeholder, value: null }, ...allOptions];
  }

  return (
    <InputWrapper {...wrapperProps} showError={showError}>
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
        options={allOptions}
        placeholder={placeholder}
        selection
        value={value || ''}
      />
    </InputWrapper>
  );
};

Dropdown.defaultProps = {
  normalize: (value: string) => value,
};

export default Dropdown;
