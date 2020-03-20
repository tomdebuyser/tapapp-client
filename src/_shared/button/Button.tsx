import React, { FC, ReactNode } from 'react';
import { Button as SemanticButton, ButtonProps, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import './button.scss';

interface Props {
  asText?: boolean;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  href?: string;
  loading?: boolean;
  negative?: boolean;
  onClick?: () => void;
  primary?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const Button: FC<Props> = ({ asText, className, children, onClick = noop, disabled, loading, href, type, primary, negative }) => {
  const isDisabled = disabled || loading;

  function renderSemanticButton(extraProps: ButtonProps) {
    if (asText) {
      const props: Record<string, unknown> = {};
      if (extraProps.type) props.type = extraProps.type;
      if (extraProps.onClick) props.onClick = extraProps.onClick;
      return (
        <button {...props} className={classnames('as-text', className, { loading, negative, primary })} disabled={isDisabled}>
          <div className="button-inner">
            {children}
            {loading && (
              <div className="loader-wrapper">
                <Loader active inline />
              </div>
            )}
          </div>
        </button>
      );
    }
    return (
      <SemanticButton
        {...extraProps}
        className={className}
        disabled={isDisabled}
        loading={loading}
        negative={negative}
        primary={primary}
      >
        <div className="button-inner">{children}</div>
      </SemanticButton>
    );
  }

  if (href) {
    return <Link to={href}>{renderSemanticButton({ as: 'span' })}</Link>;
  }
  return renderSemanticButton({ onClick, type });
};

Button.defaultProps = {
  className: '',
  type: 'button',
};

export default Button;
