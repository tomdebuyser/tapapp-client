import React, { FC } from 'react';
import { TextArea as SemanticTextArea, TextAreaProps } from 'semantic-ui-react';
import classnames from 'classnames';
import BaseInput, { BaseInputProps } from '../Input';
import { useInputError } from '../../../_hooks';

export interface Props extends BaseInputProps {
  normalize?: (value: string) => string;
  onChange?: (value: string, name: string) => void;
  placeholder?: string;
  rows?: number;
  value?: string;
}

const TextArea: FC<Props> = ({ normalize, onChange, placeholder, rows, value, ...baseProps }) => {
  const { errorMessage, name } = baseProps;
  const { setDirty, showError } = useInputError(errorMessage);

  return (
    <BaseInput {...baseProps} className={classnames('ui form', baseProps.className)} showError={showError}>
      <SemanticTextArea
        className={classnames({ error: showError })}
        onChange={(_, data: TextAreaProps) => {
          console.log('dsfdss');
          const normalizedValue = normalize(data.value as string);
          onChange(normalizedValue, name);
          setDirty();
        }}
        placeholder={placeholder}
        rows={rows}
        value={value}
      />
    </BaseInput>
  );
};

TextArea.defaultProps = {
  normalize: (value: string) => value,
  rows: 5,
};

export default TextArea;
