import { readdirSync, writeFileSync } from 'fs';

const TRANSLATIONS_PATH = `${__dirname}`;
const TRANSLATION_TYPINGS_PATH = `${TRANSLATIONS_PATH}/typings`;

function valueIfEmpty(key: string): string {
  return `[[${key}]]`;
}

function fillEmptyValues(object: unknown, value = ''): unknown {
  if (typeof object === 'string') {
    if (`${object}`.length === 0) return valueIfEmpty(value);
    return object;
  }
  return Object.keys(object).reduce(
    (acc, key) => ({ ...acc, [key]: fillEmptyValues(object[key], `${value ? `${value}.` : ''}${key}`) }),
    {},
  );
}

function translationKeys(object: unknown, value = ''): unknown {
  if (typeof object === 'string') return valueIfEmpty(value);
  return Object.keys(object).reduce(
    (acc, key) => ({ ...acc, [key]: translationKeys(object[key], `${value ? `${value}.` : ''}${key}`) }),
    {},
  );
}

function capitalizeFirstLetter(value: string): string {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

// Create a 'typings' folder
try {
  require('fs').mkdirSync(TRANSLATION_TYPINGS_PATH);
} catch (e) {
  // Already exists
}

// Create TS typing files for each .json translations file
require('fs')
  .readdirSync(TRANSLATIONS_PATH)
  .filter(file => file.endsWith('.json'))
  .forEach((file, index) => {
    // Read the .json file
    const content = require('fs').readFileSync(`${TRANSLATIONS_PATH}/${file}`);
    const locale = file.replace('.json', '');

    // Use the json values, but mark the empty values
    const translations = JSON.stringify(fillEmptyValues(JSON.parse(content)));

    // Create a .ts file for the current locale
    require('fs').writeFileSync(
      `${TRANSLATION_TYPINGS_PATH}/${locale}.ts`,
      `export type Translations${capitalizeFirstLetter(locale)} = ${translations};
      \n\n
      export const translations${capitalizeFirstLetter(locale)}: Translations${capitalizeFirstLetter(locale)} = ${translations};`,
    );

    // Create one 'keys.ts' file where all translation keys are used as value for dev-mode
    if (index === 0) {
      require('fs').writeFileSync(
        `${TRANSLATION_TYPINGS_PATH}/keys.ts`,
        `export const translationKeys = ${JSON.stringify(translationKeys(JSON.parse(content)))}`,
      );
    }
  });
