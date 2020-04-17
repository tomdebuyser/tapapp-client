import React, { FC, useState } from 'react';
import ReactQuill, { UnprivilegedEditor } from 'react-quill';
import classnames from 'classnames';
import { trim } from '../../../../_utils/formValidation';
import 'react-quill/dist/quill.snow.css';
import './wysiwygEditor.scss';
import { useToggle } from '../../../../_hooks';

// This represents the buttons and its options that will be visible in the toolbar
// More info: https://quilljs.com/docs/modules/toolbar/
const toolbar = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote', { color: [] }],
  [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
  ['link', 'image'],
];

// Almost every toolbar option has an associated format. The formats we use, should be specified here.
// More info: https://quilljs.com/docs/formats/
const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'color',
  'align',
  'list',
  'bullet',
  'link',
  'image',
];

/**
 * Most of the integrated stylings are done with inline styling automatically, but in some cases a class name is used.
 * To make the html value useable everywhere (app, email, ...), we will parse the class names to its inline styling equivalent.
 */
const classNameToStyle: Record<string, string> = {
  'ql-align-center': 'text-align: center;',
  'ql-align-justify': 'text-align: justify;',
  'ql-align-right': 'text-align: right;',
};

// The default value of the editor is HTML as string
function replaceClassNames(value: string): string {
  return Object.keys(classNameToStyle).reduce<string>(
    (acc: string, className: string) =>
      acc.replace(new RegExp(`class="${className}"`, 'g'), `style="${classNameToStyle[className]}"`),
    value,
  );
}

interface Props {
  disabled?: boolean;
  error?: boolean;
  onChange?: (value: string) => void;
  placeholder?: string;
  rows?: number;
  value?: string;
}

const WysiwygEditor: FC<Props> = ({ disabled, error, onChange, placeholder, rows, value }) => {
  // We keep the content containing class names here to pass to the editor, otherwise it does not function well.
  const [content, setContent] = useState(value);
  const [isActive, setIsActive] = useToggle(false);

  return (
    <ReactQuill
      className={classnames({ active: isActive, disabled, error })}
      formats={formats}
      modules={{ toolbar }}
      onBlur={() => setIsActive(false)}
      onChange={(newContent: string, _delta, _source, editor: UnprivilegedEditor) => {
        const isEmpty = trim(editor.getText()).length === 0;
        setContent(newContent);
        onChange?.(isEmpty ? '' : replaceClassNames(newContent));
      }}
      onFocus={() => setIsActive(true)}
      placeholder={placeholder}
      readOnly={disabled}
      style={{ height: `${rows * 3.4}rem` }}
      theme="snow"
      value={content}
    />
  );
};

WysiwygEditor.defaultProps = {
  rows: 10,
};

export default WysiwygEditor;
