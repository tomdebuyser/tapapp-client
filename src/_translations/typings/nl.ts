export type TranslationsNl = {
  AUTH: {
    LOGIN: { USERNAME: 'Gebruikersnaam'; PASSWORD: 'Wachtwoord'; BUTTON: 'Aanmelden' };
    ERRORS: {
      UNAUTHORIZED: 'Gebruikersnaam en/of wachtwoord incorrect';
      USER_STATE_NOT_ALLOWED: 'Dit account is niet actief, waardoor je niet kan inloggen. Contacteer jouw administrator.';
    };
  };
  ORDER: {
    COMPOSE: {
      ACTION_BAR: { CANCEL: 'Wijziging annuleren'; CHECKOUT: 'Afrekenen'; DELETE: 'Bestelling verwijderen'; TOTAL: 'Totaal' };
    };
    CHECKOUT: {
      TITLE: 'Kies een betaalmethode';
      PAYMENT_TYPES: {
        CASH: 'Cash betalen';
        SMARTPHONE: 'Smartphone betalen';
        SMARTPHONE_REACHED_LIMIT: 'Smartphone betalen niet mogelijk (+ €{{limit}})';
        MERGE: 'Later betalen';
        MERGE_UNFINISHED: 'Rekening samenvoegen';
        FREE: 'Gratis';
      };
      SIDEBAR: { TITLE: 'Bestelling overzicht'; TOTAL_COUNT: { SINGULAR: '{{amount}} product'; PLURAL: '{{amount}} producten' } };
      CASH: {
        TITLE: 'Cash betalen';
        EXPLANATION: 'Ontvang het geld en steek het in de kassa';
        BUTTON_PAY: 'Betaling ontvangen';
        BUTTON_STOP: 'Betaling stoppen';
        CALCULATOR: { PLACEHOLDER: 'Vul ontvangen bedrag in'; BUTTON: 'Wisselgeld berekenen' };
      };
      PAYCONIQ: {
        TITLE: 'Smartphone betalen';
        EXPLANATION: 'Betaal door de QR Code te scannen met één van onderstaande banking apps';
        STATUS: {
          IDENTIFIED: 'Betaling bezig';
          AUTHORIZED: 'Betaling controleren';
          SUCCEEDED: 'Betaling ontvangen';
          FAILED: 'Betaling mislukt';
          EXPIRED: 'Betaling verlopen';
          CANCELLED: 'Betaling geannuleerd';
          LOADING: 'QR Code ophalen';
        };
        BUTTON_RETRY: 'Opnieuw proberen';
        BUTTON_STOP: 'Betaling stoppen';
      };
      MERGE: {
        TITLE: 'Later betalen';
        EXPLANATION: 'Voeg de bestelling toe aan een bestaande of nieuwe rekening';
        EXPLANATION_NEW: 'Voeg de bestelling toe aan een nieuwe rekening';
        BUTTON_NEW: 'Nieuwe rekening';
        BUTTON_STOP: 'Betaling stoppen';
        ADD_CLIENT_NAME_MODAL: {
          TITLE: 'Nieuwe rekening maken';
          CONTENT: 'Voer de naam van de persoon in waarvoor je de rekening maakt. Je kan deze rekening op een later tijdsstip afrekenen.';
          ERROR_ALREADY_IN_USE: 'Er bestaat al een rekening met deze naam.';
          INPUT_PLACEHOLDER: 'Naam van de persoon';
          BUTTON: 'Voeg toe';
        };
        UNFINISHED: {
          TITLE: 'Rekening samenvoegen';
          EXPLANATION: 'Voeg de rekening samen met één van de onderstaande rekeningen';
        };
      };
    };
    FINISHED: {
      EXPLANATION: {
        ORDER_PAID: 'De bestelling werd succesvol betaald!';
        ADDED_CLIENT_NAME: 'De bestelling werd op een nieuwe rekening geplaatst!';
        ORDERS_MERGED: 'De bestelling werd op de bestaande rekening geplaatst!';
      };
      BUTTON: 'Nieuwe bestelling';
    };
    CONFIRM_DELETE: {
      BUTTON: 'Ja, verwijder';
      CONTENT: 'Ben je zeker dat je deze bestelling in zijn geheel wil verwijderen?';
      TITLE: 'Bestelling verwijderen';
    };
  };
  ORDERS: {
    UNFINISHED: {
      TITLE: 'Openstaande rekeningen';
      EXPLANATION: 'Selecteer een openstaande rekening om ze af te rekenen';
      NO_RESULTS: 'Er zijn geen openstaande rekeningen';
      SIDEBAR: { CHECKOUT_ASAP: 'Probeer openstaande rekeningen steeds tijdens hetzelfde bezoek af te rekenen.' };
      ITEM: { NO_NAME: 'Naamloos'; CREATED_AT: 'Aangemaakt op {{date}}'; BUTTON_CHECKOUT: 'Afrekenen'; BUTTON_ADD: 'Voeg toe' };
    };
    CONFIRM_MERGE: {
      BUTTON: 'Ja, voeg toe';
      CONTENT: 'Ben je zeker dat je deze bestelling aan de rekening van "{{name}}" wil toevoegen?';
      TITLE: 'Aan rekening toevoegen';
    };
  };
  SHARED: {
    BUTTONS: { CANCEL: 'Annuleren'; CREATE: 'Aanmaken'; DELETE: 'Verwijderen'; EDIT: 'Wijzigen'; SAVE: 'Wijzigingen opslaan' };
    NAVIGATION: { UNFINISHED_ORDERS: 'Openstaande rekeningen' };
    PLACEHOLDER: { DATE: 'dd/mm/jjjj'; SEARCH: 'Zoeken…'; TIME: 'uu:mm' };
    LOADING_APPLICATION: 'Laden van tapapp...';
  };
  ERRORS: {
    GENERAL: 'Er ging iets mis. Probeer opnieuw.';
    VALIDATION: {
      AFTER_DATE: 'Datum zou na {{date}} moeten vallen';
      BEFORE_DATE: 'Datum zou voor {{date}} moeten vallen';
      EMPTY_ARRAY: 'Kies tenminste één';
      FORM: 'Sommige velden zijn niet (correct) ingevuld.';
      INVALID_NEW_AND_REPEATED_PASSWORD: 'Het nieuwe wachtwoord komt niet overeen met de herhaling.';
      INVALID: 'Waarde is niet correct.';
      MAX_LENGTH: 'Waarde zou tenminste {{length}} karakters moeten hebben.';
      MIN_LENGTH: 'Waarde zou maximum {{length}} karakters mogen hebben.';
      NOT_A_NUMBER: 'Waarde is geen nummer.';
      PASSWORD_TOO_SHORT: 'Dit wachtwoord is te kort';
      PASSWORD_UNSAFE: 'Dit wachtwoord voldoet niet aan de vereisten.';
      REQUIRED: 'Verplicht';
    };
  };
};

export const translationsNl: TranslationsNl = {
  AUTH: {
    LOGIN: { USERNAME: 'Gebruikersnaam', PASSWORD: 'Wachtwoord', BUTTON: 'Aanmelden' },
    ERRORS: {
      UNAUTHORIZED: 'Gebruikersnaam en/of wachtwoord incorrect',
      USER_STATE_NOT_ALLOWED: 'Dit account is niet actief, waardoor je niet kan inloggen. Contacteer jouw administrator.',
    },
  },
  ORDER: {
    COMPOSE: {
      ACTION_BAR: { CANCEL: 'Wijziging annuleren', CHECKOUT: 'Afrekenen', DELETE: 'Bestelling verwijderen', TOTAL: 'Totaal' },
    },
    CHECKOUT: {
      TITLE: 'Kies een betaalmethode',
      PAYMENT_TYPES: {
        CASH: 'Cash betalen',
        SMARTPHONE: 'Smartphone betalen',
        SMARTPHONE_REACHED_LIMIT: 'Smartphone betalen niet mogelijk (+ €{{limit}})',
        MERGE: 'Later betalen',
        MERGE_UNFINISHED: 'Rekening samenvoegen',
        FREE: 'Gratis',
      },
      SIDEBAR: { TITLE: 'Bestelling overzicht', TOTAL_COUNT: { SINGULAR: '{{amount}} product', PLURAL: '{{amount}} producten' } },
      CASH: {
        TITLE: 'Cash betalen',
        EXPLANATION: 'Ontvang het geld en steek het in de kassa',
        BUTTON_PAY: 'Betaling ontvangen',
        BUTTON_STOP: 'Betaling stoppen',
        CALCULATOR: { PLACEHOLDER: 'Vul ontvangen bedrag in', BUTTON: 'Wisselgeld berekenen' },
      },
      PAYCONIQ: {
        TITLE: 'Smartphone betalen',
        EXPLANATION: 'Betaal door de QR Code te scannen met één van onderstaande banking apps',
        STATUS: {
          IDENTIFIED: 'Betaling bezig',
          AUTHORIZED: 'Betaling controleren',
          SUCCEEDED: 'Betaling ontvangen',
          FAILED: 'Betaling mislukt',
          EXPIRED: 'Betaling verlopen',
          CANCELLED: 'Betaling geannuleerd',
          LOADING: 'QR Code ophalen',
        },
        BUTTON_RETRY: 'Opnieuw proberen',
        BUTTON_STOP: 'Betaling stoppen',
      },
      MERGE: {
        TITLE: 'Later betalen',
        EXPLANATION: 'Voeg de bestelling toe aan een bestaande of nieuwe rekening',
        EXPLANATION_NEW: 'Voeg de bestelling toe aan een nieuwe rekening',
        BUTTON_NEW: 'Nieuwe rekening',
        BUTTON_STOP: 'Betaling stoppen',
        ADD_CLIENT_NAME_MODAL: {
          TITLE: 'Nieuwe rekening maken',
          CONTENT:
            'Voer de naam van de persoon in waarvoor je de rekening maakt. Je kan deze rekening op een later tijdsstip afrekenen.',
          ERROR_ALREADY_IN_USE: 'Er bestaat al een rekening met deze naam.',
          INPUT_PLACEHOLDER: 'Naam van de persoon',
          BUTTON: 'Voeg toe',
        },
        UNFINISHED: {
          TITLE: 'Rekening samenvoegen',
          EXPLANATION: 'Voeg de rekening samen met één van de onderstaande rekeningen',
        },
      },
    },
    FINISHED: {
      EXPLANATION: {
        ORDER_PAID: 'De bestelling werd succesvol betaald!',
        ADDED_CLIENT_NAME: 'De bestelling werd op een nieuwe rekening geplaatst!',
        ORDERS_MERGED: 'De bestelling werd op de bestaande rekening geplaatst!',
      },
      BUTTON: 'Nieuwe bestelling',
    },
    CONFIRM_DELETE: {
      BUTTON: 'Ja, verwijder',
      CONTENT: 'Ben je zeker dat je deze bestelling in zijn geheel wil verwijderen?',
      TITLE: 'Bestelling verwijderen',
    },
  },
  ORDERS: {
    UNFINISHED: {
      TITLE: 'Openstaande rekeningen',
      EXPLANATION: 'Selecteer een openstaande rekening om ze af te rekenen',
      NO_RESULTS: 'Er zijn geen openstaande rekeningen',
      SIDEBAR: { CHECKOUT_ASAP: 'Probeer openstaande rekeningen steeds tijdens hetzelfde bezoek af te rekenen.' },
      ITEM: { NO_NAME: 'Naamloos', CREATED_AT: 'Aangemaakt op {{date}}', BUTTON_CHECKOUT: 'Afrekenen', BUTTON_ADD: 'Voeg toe' },
    },
    CONFIRM_MERGE: {
      BUTTON: 'Ja, voeg toe',
      CONTENT: 'Ben je zeker dat je deze bestelling aan de rekening van "{{name}}" wil toevoegen?',
      TITLE: 'Aan rekening toevoegen',
    },
  },
  SHARED: {
    BUTTONS: { CANCEL: 'Annuleren', CREATE: 'Aanmaken', DELETE: 'Verwijderen', EDIT: 'Wijzigen', SAVE: 'Wijzigingen opslaan' },
    NAVIGATION: { UNFINISHED_ORDERS: 'Openstaande rekeningen' },
    PLACEHOLDER: { DATE: 'dd/mm/jjjj', SEARCH: 'Zoeken…', TIME: 'uu:mm' },
    LOADING_APPLICATION: 'Laden van tapapp...',
  },
  ERRORS: {
    GENERAL: 'Er ging iets mis. Probeer opnieuw.',
    VALIDATION: {
      AFTER_DATE: 'Datum zou na {{date}} moeten vallen',
      BEFORE_DATE: 'Datum zou voor {{date}} moeten vallen',
      EMPTY_ARRAY: 'Kies tenminste één',
      FORM: 'Sommige velden zijn niet (correct) ingevuld.',
      INVALID_NEW_AND_REPEATED_PASSWORD: 'Het nieuwe wachtwoord komt niet overeen met de herhaling.',
      INVALID: 'Waarde is niet correct.',
      MAX_LENGTH: 'Waarde zou tenminste {{length}} karakters moeten hebben.',
      MIN_LENGTH: 'Waarde zou maximum {{length}} karakters mogen hebben.',
      NOT_A_NUMBER: 'Waarde is geen nummer.',
      PASSWORD_TOO_SHORT: 'Dit wachtwoord is te kort',
      PASSWORD_UNSAFE: 'Dit wachtwoord voldoet niet aan de vereisten.',
      REQUIRED: 'Verplicht',
    },
  },
};
