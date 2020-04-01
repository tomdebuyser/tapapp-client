import React, { FC, ReactNode, BaseSyntheticEvent } from 'react';
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
  onClick?: (event?: BaseSyntheticEvent) => void;
  primary?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: FC<Props> = ({ asText, className, children, onClick, disabled, loading, href, type, primary, negative }) => {
  const isDisabled = disabled || loading;

  function renderSemanticButton(extraProps: ButtonProps) {
    if (asText) {
      const props: Record<string, unknown> = {};
      if (extraProps.type) props.type = extraProps.type;
      if (extraProps.onClick) props.onClick = extraProps.onClick;
      return (
        <button {...props} className={classnames('as-text', { loading, negative, primary }, className)} disabled={isDisabled}>
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
  onClick: () => {},
  type: 'button',
};

export default Button;
