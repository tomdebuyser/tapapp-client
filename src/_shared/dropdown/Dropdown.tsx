import React, { FC, ChangeEvent } from 'react';
import { Dropdown as SemanticDropdown, InputOnChangeData } from 'semantic-ui-react';
import { useInputError } from '../../_hooks';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './dropdown.scss';

interface Props {
  name: string;
  multiple?: boolean;
  value: string | string[];
  normalize?: (value: string) => string;
  onChange: (value: string | string[], name: string) => void;
  options: { key: string; text: string; value: string }[] | [];
  error?: boolean;
  errorMessage?: string;
  label: string;
}

const Dropdown: FC<Props> = ({ name, multiple, value, label, normalize, onChange, error, errorMessage, options }) => {
  const { showError, setDirty } = useInputError(error);

  return (
    <div className="dropdown-wrapper">
      <label htmlFor={name}>{label}</label>
      <SemanticDropdown
        id={name}
        name={name}
        multiple={multiple}
        selection
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
          const normalizedValue = normalize(data?.value);
          onChange(normalizedValue, data?.name);
          setDirty();
        }}
        error={showError}
        options={options}
      />
      <ErrorMessage isVisible={showError}>{errorMessage}</ErrorMessage>
    </div>
  );
};

Dropdown.defaultProps = {
  normalize: (value: string) => value,
};

export default Dropdown;
