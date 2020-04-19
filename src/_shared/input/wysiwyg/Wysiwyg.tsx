import React, { FC } from 'react';
import InputWrapper, { InputWrapperProps } from '../InputWrapper';
import { useInputError } from '../../../_hooks';
import WysiwygEditor from './editor/WysiwygEditor';

interface Props extends InputWrapperProps {
  onChange: (value: string, name: string) => void;
  placeholder?: string;
  rows?: number;
  value?: string;
}

const Wysiwyg: FC<Props> = ({ onChange, placeholder, rows, value, ...wrapperProps }) => {
  const { disabled, validation, name } = wrapperProps;
  const { setDirty, showError } = useInputError(validation);

  return (
    <InputWrapper {...wrapperProps} showError={showError}>
      <WysiwygEditor
        disabled={disabled}
        error={showError}
        onChange={value => {
          onChange(value, name);
          setDirty();
        }}
        placeholder={placeholder}
        rows={rows}
        value={value}
      />
    </InputWrapper>
  );
};

export default Wysiwyg;
