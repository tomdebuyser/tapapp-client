import React, { FC } from 'react';
import Checkbox, { InputCheckboxProps } from '../checkbox/Checkbox';

const Radio: FC<InputCheckboxProps> = props => <Checkbox {...props} radio type="radio" />;

export default Radio;
