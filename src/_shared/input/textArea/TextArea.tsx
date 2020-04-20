import React, { FC } from 'react';
import { TextArea as SemanticTextArea, TextAreaProps } from 'semantic-ui-react';
import classnames from 'classnames';
import InputWrapper, { InputWrapperProps } from '../InputWrapper';
import { useInputError } from '../../../_hooks';
import './textArea.scss';

export interface Props extends InputWrapperProps {
  characterLimit?: number;
  normalize?: (value: string) => string;
  onChange?: (value: string, name: string) => void;
  placeholder?: string;
  rows?: number;
  value?: string;
}

const TextArea: FC<Props> = ({ characterLimit, normalize, onChange, placeholder, rows, value, ...wrapperProps }) => {
  const { disabled, validation, name } = wrapperProps;
  const { setDirty, showError } = useInputError(validation);
  const hasReachedCharacterLimit = (val?: string) => characterLimit && (val || value || '').length >= characterLimit;

  return (
    <InputWrapper {...wrapperProps} className={classnames('ui form', wrapperProps.className)} showError={showError}>
      <SemanticTextArea
        className={classnames({ error: showError })}
        disabled={disabled}
        onChange={(_, data: TextAreaProps) => {
          let normalizedValue = normalize(data.value as string);
          if (hasReachedCharacterLimit(normalizedValue)) normalizedValue = normalizedValue.slice(0, characterLimit);
          onChange(normalizedValue, name);
          setDirty();
        }}
        placeholder={placeholder}
        rows={rows}
        value={value}
      />
      {characterLimit && (
        <div className={classnames('character-limit', { reached: hasReachedCharacterLimit(value) })}>
          <span>{`${characterLimit - value.length}/${characterLimit}`}</span>
        </div>
      )}
    </InputWrapper>
  );
};

TextArea.defaultProps = {
  normalize: (value: string) => value,
  rows: 5,
};

export default TextArea;
