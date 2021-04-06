import { translationsEn, TranslationsEn } from './typings/en';
import { translationsNl, TranslationsNl } from './typings/nl';
import { translationKeys } from './typings/keys';
// import './translate';

export type Locale = 'en' | 'nl';

type Translations = TranslationsEn | TranslationsNl;

const translations: Record<Locale, Translations> = {
  en: translationsEn,
  nl: translationsNl,
};

export class I18n {
  static get labels(): Translations {
    if (this.isDevMode()) return translationKeys as Translations;
    return translations[I18n.getLocale()];
  }

  static insert(value: string, inserts: Record<string, string | number> = {}): string {
    return Object.keys(inserts).reduce((acc, key) => acc.replace(new RegExp(`{{${key}}}`, 'g'), `${inserts[key]}`), value);
  }

  static setLocale(locale: Locale): void {
    window.localStorage.setItem('locale', locale);
  }

  static setDevMode(flag: boolean): void {
    window.localStorage.setItem('dev-mode', `${flag}`);
  }

  private static getLocale(): Locale {
    return (window.localStorage.getItem('locale') as Locale) || 'en';
  }

  private static isDevMode(): boolean {
    return window.localStorage.getItem('dev-mode') === `${true}`;
  }
}
