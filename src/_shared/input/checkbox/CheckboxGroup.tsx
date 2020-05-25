import React, { FC, ReactNode } from 'react';
import classnames from 'classnames';
import InputWrapper, { InputWrapperProps } from '../InputWrapper';
import './checkboxGroup.scss';

export type CheckboxGroupProps = InputWrapperProps & {
  children: ReactNode;
  horizontal?: boolean;
};

const CheckboxGroup: FC<CheckboxGroupProps> = ({ children, horizontal, ...wrapperProps }) => {
  const { validation } = wrapperProps;

  return (
    <InputWrapper {...wrapperProps} showError={!!validation?.message}>
      <div className={classnames('checkbox-group', { horizontal })}>{children}</div>
    </InputWrapper>
  );
};

CheckboxGroup.defaultProps = {
  horizontal: false,
};

export default CheckboxGroup;
