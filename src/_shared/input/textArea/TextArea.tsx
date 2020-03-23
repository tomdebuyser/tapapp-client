import React, { FC, ChangeEvent } from 'react';
import { TextArea as SemanticTextArea, TextAreaProps } from 'semantic-ui-react';
import classnames from 'classnames';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import Icon from '../../icon/Icon';
import { useInputError } from '../../../_hooks';
import '../input.scss';

export interface Props {
  className?: string;
  disabled?: boolean;
  errorMessage?: string;
  label?: string;
  labelIcon?: string;
  name?: string;
  normalize?: (value: string) => string;
  onChange?: (value: string, name: string) => void;
  placeholder?: string;
  rows?: number;
  value?: string;
}

const TextArea: FC<Props> = ({ className, label, labelIcon, errorMessage, onChange, normalize, ...props }) => {
  const { showError, setDirty } = useInputError(errorMessage);

  return (
    <div className={classnames('ui form input-wrapper', className)}>
      {!!label && (
        <label htmlFor={props.name}>
          {!!labelIcon && <Icon name={labelIcon} />}
          <span>{label}</span>
        </label>
      )}
      <SemanticTextArea
        {...props}
        className={classnames({ error: showError })}
        onChange={(_: ChangeEvent<HTMLTextAreaElement>, data: TextAreaProps) => {
          const normalizedValue = normalize(data?.value as string);
          onChange(normalizedValue, data?.name);
          setDirty();
        }}
      />
      <ErrorMessage isVisible={showError}>{errorMessage}</ErrorMessage>
    </div>
  );
};

TextArea.defaultProps = {
  className: '',
  normalize: (value: string) => value,
  rows: 5,
};

export default TextArea;
