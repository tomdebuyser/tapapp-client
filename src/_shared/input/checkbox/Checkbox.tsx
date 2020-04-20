import React, { FC } from 'react';
import { Checkbox as SemanticCheckbox, CheckboxProps } from 'semantic-ui-react';
import classnames from 'classnames';
import InputWrapper, { InputWrapperProps } from '../InputWrapper';
import { useInputError } from '../../../_hooks';

export interface InputCheckboxProps extends InputWrapperProps {
  checked?: boolean;
  label?: string;
  onChange: (checked: boolean, name: string) => void;
  radio?: boolean;
  toggle?: boolean;
  type?: 'checkbox' | 'radio';
}

const Checkbox: FC<InputCheckboxProps> = ({ checked, label, onChange, radio, toggle, type, ...wrapperProps }) => {
  const { disabled, validation, name } = wrapperProps;
  const { setDirty, showError } = useInputError(validation);

  return (
    <InputWrapper {...wrapperProps} showError={showError}>
      <SemanticCheckbox
        checked={checked}
        className={classnames({ error: showError })}
        disabled={disabled}
        label={label}
        name={name}
        onChange={(_, data: CheckboxProps) => {
          onChange(data.checked, data.name);
          setDirty();
        }}
        radio={radio}
        toggle={toggle}
        type={type}
      />
    </InputWrapper>
  );
};

Checkbox.defaultProps = {
  type: 'checkbox',
};

export default Checkbox;
