import React, { FC } from 'react';
import classnames from 'classnames';
import Datepicker from '../../datepicker/Datepicker';
import { formatDate, dateFromString } from '../../../_utils/dateHelpers';
import { normalizeDate } from '../../../_utils/normalizeHelpers';
import Icon from '../../icon/Icon';
import { translations } from '../../../_translations';
import InputField, { InputFieldProps } from '../inputField/InputField';
import './inputFieldDate.scss';

type Props = InputFieldProps & {
  maxDate?: Date;
  minDate?: Date;
};

const InputFieldDate: FC<Props> = props => {
  const { label, maxDate, minDate, name, onChange, value } = props;
  return (
    <div className={classnames('input-date-wrapper', { 'has-label': !!label })}>
      <InputField
        {...props}
        normalize={normalizeDate}
        placeholder={translations.getLabel('SHARED.PLACEHOLDER.DATE')}
        type="text"
      />
      <Datepicker
        maxDate={maxDate}
        minDate={minDate}
        name={name}
        onChange={(date: Date) => onChange(formatDate(date), name)}
        selected={dateFromString(value)}
        trigger={
          <button className="plain datepicker-icon" type="button">
            <Icon name="SvgCalendar" size={2.4} />
          </button>
        }
      />
    </div>
  );
};

export default InputFieldDate;
