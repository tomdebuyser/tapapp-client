import I18n from 'i18n-js';
import { config } from '../config';
import en from './en.json';
import nl from './nl.json';

const getLabel = (key: string, inserts = {}): string => {
  if (config.environment() !== 'production' && I18n.t(key, inserts) === '') {
    return `[[${key}]]`;
  }
  return I18n.t(key, inserts);
};

I18n.fallbacks = true;
I18n.locale = 'en';
I18n.missingTranslation = translation => `[[${translation}]]`;

// Make translations object with all the labels
const translations = {
  en,
  nl,
};

I18n.translations = translations;

export default {
  I18n,
  getLabel,
};
