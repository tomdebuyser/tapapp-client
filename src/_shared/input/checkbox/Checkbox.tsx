import React, { FC } from 'react';
import { Checkbox as SemanticCheckbox, CheckboxProps } from 'semantic-ui-react';
import classnames from 'classnames';
import { useInputError } from '../../../_hooks';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import '../input.scss';

export interface InputCheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  label?: string;
  name?: string;
  onChange?: (checked: boolean, name: string) => void;
  radio?: boolean;
  toggle?: boolean;
  type?: 'checkbox' | 'radio';
}

const Checkbox: FC<InputCheckboxProps> = ({ errorMessage, onChange, ...props }) => {
  const { showError, setDirty } = useInputError(errorMessage);

  return (
    <div className={classnames('input-wrapper', { error: showError })}>
      <SemanticCheckbox
        {...props}
        className={classnames({ error: showError })}
        onChange={(_, data: CheckboxProps) => {
          onChange(data?.checked, data.name);
          setDirty();
        }}
      />
      <ErrorMessage isVisible={showError}>{errorMessage}</ErrorMessage>
    </div>
  );
};

Checkbox.defaultProps = {
  type: 'checkbox',
};

export default Checkbox;
