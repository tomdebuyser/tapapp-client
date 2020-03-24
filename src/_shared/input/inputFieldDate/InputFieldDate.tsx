import React, { FC } from 'react';
import classnames from 'classnames';
import Datepicker from '../../datepicker/Datepicker';
import { formatDate, dateFromString } from '../../../_utils/timeHelpers';
import { normalizeDate } from '../../../_utils/normalizeHelpers';
import Icon from '../../icon/Icon';
import { translations } from '../../../_translations';
import InputField, { InputFieldProps } from '../inputField/InputField';
import './inputFieldDate.scss';

const InputFieldDate: FC<InputFieldProps> = props => {
  const { label, name, onChange, value } = props;
  return (
    <div className={classnames('input-date-wrapper', { 'has-label': !!label })}>
      <InputField
        {...props}
        normalize={normalizeDate}
        placeholder={translations.getLabel('SHARED.PLACEHOLDER.DATE')}
        type="text"
      />
      <Datepicker
        name={name}
        onChange={(date: Date) => onChange(formatDate(date), name)}
        selected={dateFromString(value)}
        trigger={
          <button className="plain datepicker-icon">
            <Icon name="SvgCalendar" size={2.4} />
          </button>
        }
      />
    </div>
  );
};

export default InputFieldDate;
