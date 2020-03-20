import React, { FC, ReactNode } from 'react';
import Picker, { registerLocale, ReactDatePickerProps } from 'react-datepicker';
import nl from 'date-fns/locale/nl';

import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.scss';

registerLocale('nl', nl);

interface Props extends ReactDatePickerProps {
  trigger?: ReactNode;
}

const Datepicker: FC<Props> = ({ trigger, ...props }) => (
  <Picker popperPlacement="bottom-start" {...props} customInput={trigger} locale="nl" />
);

export default Datepicker;
