import React, { FC } from 'react';
import { useDropzone } from 'react-dropzone';
import classnames from 'classnames';
import './fileInput.scss';
import Button from '../../button/Button';
import Icon from '../../icon/Icon';
import { translations } from '../../../_translations';
import { useToggle, useInputError } from '../../../_hooks';
import InputWrapper, { InputWrapperProps } from '../InputWrapper';

const MB_MULTIPLIER = 1000000;

export enum FileInputType {
  All = 'ALL',
  Image = 'IMAGE',
}

const requirements: Record<FileInputType, { accept?: string[]; extensions: string[]; maxSize: number }> = {
  [FileInputType.All]: {
    accept: null,
    extensions: ['.*'],
    maxSize: 3 * MB_MULTIPLIER,
  },
  [FileInputType.Image]: {
    accept: ['image/*'],
    extensions: ['.png', '.jpg', '.jpeg'],
    maxSize: 3 * MB_MULTIPLIER,
  },
  // All mime types here: https://www.iana.org/assignments/media-types/media-types.xhtml
};

type Props = InputWrapperProps & {
  maxAmountOfFiles?: number;
  onChange: (files: File[], name: string) => void;
  type: FileInputType;
  value?: File[];
};

function formatSize(size: number): string {
  return `${(size / MB_MULTIPLIER).toFixed(1)} MB`;
}

const FileInput: FC<Props> = ({ maxAmountOfFiles, onChange, type, value, ...wrapperProps }) => {
  const { disabled, validation, name } = wrapperProps;
  const { setDirty, showError } = useInputError(validation);
  const [isDropping, setIsDropping] = useToggle(false);
  const [isError, setIsError] = useToggle(false);
  const isDisabled = disabled || value.length === maxAmountOfFiles;
  const { accept, maxSize, extensions } = requirements[type];

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    disabled: isDisabled,
    maxSize,
    multiple: maxAmountOfFiles > 1,
    onDragLeave: () => setIsDropping(false),
    onDragOver: () => {
      setIsDropping(true);
      setIsError(false);
    },
    onDrop: (acceptedFiles: File[], rejectedFiles: File[]) => {
      onChange([...value, ...acceptedFiles.filter(file => !value.some(f => f.name === file.name))], name);
      setDirty();
      setIsDropping(false);
      setIsError(rejectedFiles.length > 0);
    },
  });

  function renderTrigger() {
    return (
      <div className="trigger">
        <Icon name="SvgUpload" size={5.5} />
        <span className="title">{translations.getLabel('SHARED.FILE_UPLOAD.TITLE')}</span>
        <span className="requirements">
          {translations.getLabel('SHARED.FILE_UPLOAD.REQUIREMENTS', {
            extensions: extensions.join(', '),
            size: formatSize(maxSize),
          })}
        </span>
      </div>
    );
  }

  function renderPreview(file: File) {
    return (
      <div className="preview" key={file.name}>
        <img alt={file.name} src={URL.createObjectURL(file)} />
        <div className="details">
          <span className="name">{file.name}</span>
          <span className="size">{formatSize(file.size)}</span>
        </div>
        <Button
          asText
          disabled={disabled}
          onClick={() => {
            onChange(
              value.filter(f => f !== file),
              name,
            );
            setDirty();
          }}
        >
          <Icon name="SvgTrash" />
          <span>{translations.getLabel('SHARED.BUTTONS.DELETE')}</span>
        </Button>
      </div>
    );
  }

  return (
    <InputWrapper {...wrapperProps} showError={showError}>
      <div
        {...getRootProps({
          className: classnames('dropzone', {
            active: isDropping,
            'animated-error': isError,
            disabled,
            error: showError,
            'no-hover': isDisabled,
          }),
        })}
      >
        {(!isDisabled || value.length === 0) && (
          <>
            <input name={name} {...getInputProps()} />
            {renderTrigger()}
          </>
        )}
        {value.map(renderPreview)}
      </div>
    </InputWrapper>
  );
};

FileInput.defaultProps = {
  maxAmountOfFiles: 6,
  value: [],
};

export default FileInput;
