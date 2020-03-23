import React, { FC } from 'react';
import { Checkbox as SemanticCheckbox, CheckboxProps } from 'semantic-ui-react';
import classnames from 'classnames';
import BaseInput, { BaseInputProps } from '../Input';
import { useInputError } from '../../../_hooks';

export interface InputCheckboxProps extends BaseInputProps {
  checked?: boolean;
  label?: string;
  onChange: (checked: boolean, name: string) => void;
  radio?: boolean;
  toggle?: boolean;
  type?: 'checkbox' | 'radio';
}

const Checkbox: FC<InputCheckboxProps> = ({ checked, label, onChange, radio, toggle, type, ...baseProps }) => {
  const { disabled, errorMessage, name } = baseProps;
  const { setDirty, showError } = useInputError(errorMessage);

  return (
    <BaseInput {...baseProps} showError={showError}>
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
    </BaseInput>
  );
};

Checkbox.defaultProps = {
  type: 'checkbox',
};

export default Checkbox;
