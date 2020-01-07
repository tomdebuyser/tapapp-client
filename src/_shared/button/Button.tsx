import React, { FC, ReactNode } from 'react';
import { Button as SemanticButton } from 'semantic-ui-react';

import './button.scss';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  isTextLink?: boolean;
  children: ReactNode;
  onClick?: () => void;
  primary?: boolean;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const Button: FC<Props> = ({ type, isTextLink, primary, children, onClick = noop, disabled, loading, href, ...props }) => {
  if (isTextLink) {
    return (
      <SemanticButton
        as="a"
        href={href}
        type={type}
        primary={primary}
        onClick={onClick}
        disabled={disabled || loading}
        loading={loading}
      >
        {children}
      </SemanticButton>
    );
  }
  return (
    <SemanticButton type={type} primary={primary} onClick={onClick} disabled={disabled || loading} loading={loading}>
      <div className="semantic-button-content">{children}</div>
    </SemanticButton>
  );
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
