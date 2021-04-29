import { translationsEn, TranslationsEn } from './typings/en';
import { translationsNl, TranslationsNl } from './typings/nl';
import { translationKeys } from './typings/keys';

export type Locale = 'en' | 'nl';
const defaultLocale: Locale = 'en';

type Translations = TranslationsEn | TranslationsNl;

const translations: Record<Locale, Translations> = {
  en: translationsEn,
  nl: translationsNl,
};

export class I18n {
  static get labels(): Translations {
    if (this.isDevMode()) return translationKeys as Translations;
    const locale = I18n.getLocale().split('-').length > 1 ? defaultLocale : I18n.getLocale();
    return translations[locale] || translations[defaultLocale];
  }

  static insert(value: string, inserts: Record<string, string | number> = {}): string {
    return Object.keys(inserts).reduce((acc, key) => acc.replace(new RegExp(`{{${key}}}`, 'g'), `${inserts[key]}`), value);
  }

  static setLocale(locale: Locale): void {
    window.localStorage.setItem('locale', locale);
    // Reload the window to make app re-render
    window.location.reload();
  }

  static setDevMode(flag: boolean): void {
    window.sessionStorage.setItem('dev-mode', `${flag}`);
    // Reload the window to make app re-render
    window.location.reload();
  }

  static getLocale(): Locale {
    return (window.localStorage.getItem('locale') as Locale) || defaultLocale;
  }

  static isDevMode(): boolean {
    return window.sessionStorage.getItem('dev-mode') === `${true}`;
  }
}
