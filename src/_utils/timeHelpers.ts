import { format, parse, isValid, isAfter, isBefore } from 'date-fns';
import { nl } from 'date-fns/locale';

export const DEFAULT_DATE_STRING_FORMAT = 'dd/MM/yyyy';
export const DEFAULT_TIME_STRING_FORMAT = 'HH:mm';

export const formatDate = (date: Date, formatString = DEFAULT_DATE_STRING_FORMAT): string => {
  if (!isValid(date)) return null;
  return format(date, formatString, { locale: nl });
};

export const formatTime = (time: string | Date): string => {
  if (!time) return null;
  return formatDate(new Date(time), DEFAULT_TIME_STRING_FORMAT);
};

export const dateFromString = (dateString: string, formatString = DEFAULT_DATE_STRING_FORMAT): Date => {
  if (!dateString) return null;
  const date = parse(dateString, formatString, new Date(), { locale: nl });
  if (!isValid(date)) return null;
  return date;
};

export const dateFromTime = (timeString: string): Date => {
  return dateFromString(timeString, DEFAULT_TIME_STRING_FORMAT);
};

export const dateFromISOString = (isoString?: string): Date => {
  if (!isoString) return null;
  return new Date(isoString);
};

export const ISOStringFromDate = (date?: Date): string => {
  if (!isValid(date)) return null;
  return date.toISOString();
};

export function dateFromDateAndTime(date: string, time: string): Date {
  if (!date || !time) return null;
  return dateFromString(`${date} ${time}`, `${DEFAULT_DATE_STRING_FORMAT} ${DEFAULT_TIME_STRING_FORMAT}`);
}

export const isAfterDate = (date: Date, minDate: Date): boolean => {
  return isAfter(date, minDate);
};

export const isBeforeDate = (date: Date, maxDate: Date): boolean => {
  return isBefore(date, maxDate);
};
