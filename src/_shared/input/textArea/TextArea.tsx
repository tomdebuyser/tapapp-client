import React, { FC } from 'react';
import { TextArea as SemanticTextArea, TextAreaProps } from 'semantic-ui-react';
import classnames from 'classnames';
import InputWrapper, { InputWrapperProps } from '../Input';
import { useInputError } from '../../../_hooks';

export interface Props extends InputWrapperProps {
  normalize?: (value: string) => string;
  onChange?: (value: string, name: string) => void;
  placeholder?: string;
  rows?: number;
  value?: string;
}

const TextArea: FC<Props> = ({ normalize, onChange, placeholder, rows, value, ...wrapperProps }) => {
  const { errorMessage, name } = wrapperProps;
  const { setDirty, showError } = useInputError(errorMessage);

  return (
    <InputWrapper {...wrapperProps} className={classnames('ui form', wrapperProps.className)} showError={showError}>
      <SemanticTextArea
        className={classnames({ error: showError })}
        onChange={(_, data: TextAreaProps) => {
          const normalizedValue = normalize(data.value as string);
          onChange(normalizedValue, name);
          setDirty();
        }}
        placeholder={placeholder}
        rows={rows}
        value={value}
      />
    </InputWrapper>
  );
};

TextArea.defaultProps = {
  normalize: (value: string) => value,
  rows: 5,
};

export default TextArea;
