import React, { FC, ReactNode } from 'react';
import { Button as SemanticButton } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './button.scss';

interface Props {
  children: ReactNode;
  disabled?: boolean;
  href?: string;
  isTextLink?: boolean;
  loading?: boolean;
  onClick?: () => void;
  primary?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const Button: FC<Props> = ({ type, isTextLink, primary, children, onClick = noop, disabled, loading, href }) => {
  if (isTextLink) {
    return (
      <Link to={href}>
        <SemanticButton as="span" disabled={disabled || loading} loading={loading} primary={primary}>
          {children}
        </SemanticButton>
      </Link>
    );
  }
  return (
    <SemanticButton disabled={disabled || loading} loading={loading} onClick={onClick} primary={primary} type={type}>
      {children}
    </SemanticButton>
  );
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
