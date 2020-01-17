import React, { FC } from 'react';
import { translations } from '../../_translations';
import { formatDate, dateFromISOString } from '../../_utils/timeHelpers';
import './field.scss';

interface Props {
  value: string;
  label: string;
  isDate?: boolean;
}

const Field: FC<Props> = ({ value, label, isDate }) => (
  <div className="field">
    <label>{translations.getLabel(label)}</label>
    <p>{isDate ? formatDate(dateFromISOString(value)) : value}</p>
  </div>
);

export default Field;
