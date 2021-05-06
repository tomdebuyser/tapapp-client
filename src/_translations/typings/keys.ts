export const translationKeys = {
  AUTH: {
    LOGIN: { USERNAME: '[[AUTH.LOGIN.USERNAME]]', PASSWORD: '[[AUTH.LOGIN.PASSWORD]]', BUTTON: '[[AUTH.LOGIN.BUTTON]]' },
    ERRORS: { UNAUTHORIZED: '[[AUTH.ERRORS.UNAUTHORIZED]]', USER_STATE_NOT_ALLOWED: '[[AUTH.ERRORS.USER_STATE_NOT_ALLOWED]]' },
  },
  ORDER: {
    COMPOSE: {
      ACTION_BAR: {
        CANCEL: '[[ORDER.COMPOSE.ACTION_BAR.CANCEL]]',
        CHECKOUT: '[[ORDER.COMPOSE.ACTION_BAR.CHECKOUT]]',
        DELETE: '[[ORDER.COMPOSE.ACTION_BAR.DELETE]]',
        TOTAL: '[[ORDER.COMPOSE.ACTION_BAR.TOTAL]]',
      },
    },
    CHECKOUT: {
      TITLE: '[[ORDER.CHECKOUT.TITLE]]',
      PAYMENT_TYPES: {
        CASH: '[[ORDER.CHECKOUT.PAYMENT_TYPES.CASH]]',
        SMARTPHONE: '[[ORDER.CHECKOUT.PAYMENT_TYPES.SMARTPHONE]]',
        SMARTPHONE_REACHED_LIMIT: '[[ORDER.CHECKOUT.PAYMENT_TYPES.SMARTPHONE_REACHED_LIMIT]]',
        MERGE: '[[ORDER.CHECKOUT.PAYMENT_TYPES.MERGE]]',
        MERGE_UNFINISHED: '[[ORDER.CHECKOUT.PAYMENT_TYPES.MERGE_UNFINISHED]]',
        FREE: '[[ORDER.CHECKOUT.PAYMENT_TYPES.FREE]]',
      },
      SIDEBAR: {
        TITLE: '[[ORDER.CHECKOUT.SIDEBAR.TITLE]]',
        TOTAL_COUNT: {
          SINGULAR: '[[ORDER.CHECKOUT.SIDEBAR.TOTAL_COUNT.SINGULAR]]',
          PLURAL: '[[ORDER.CHECKOUT.SIDEBAR.TOTAL_COUNT.PLURAL]]',
        },
      },
      CASH: {
        TITLE: '[[ORDER.CHECKOUT.CASH.TITLE]]',
        EXPLANATION: '[[ORDER.CHECKOUT.CASH.EXPLANATION]]',
        BUTTON_PAY: '[[ORDER.CHECKOUT.CASH.BUTTON_PAY]]',
        BUTTON_STOP: '[[ORDER.CHECKOUT.CASH.BUTTON_STOP]]',
        CALCULATOR: {
          PLACEHOLDER: '[[ORDER.CHECKOUT.CASH.CALCULATOR.PLACEHOLDER]]',
          BUTTON: '[[ORDER.CHECKOUT.CASH.CALCULATOR.BUTTON]]',
        },
      },
      PAYCONIQ: {
        TITLE: '[[ORDER.CHECKOUT.PAYCONIQ.TITLE]]',
        EXPLANATION: '[[ORDER.CHECKOUT.PAYCONIQ.EXPLANATION]]',
        STATUS: {
          IDENTIFIED: '[[ORDER.CHECKOUT.PAYCONIQ.STATUS.IDENTIFIED]]',
          AUTHORIZED: '[[ORDER.CHECKOUT.PAYCONIQ.STATUS.AUTHORIZED]]',
          SUCCEEDED: '[[ORDER.CHECKOUT.PAYCONIQ.STATUS.SUCCEEDED]]',
          FAILED: '[[ORDER.CHECKOUT.PAYCONIQ.STATUS.FAILED]]',
          EXPIRED: '[[ORDER.CHECKOUT.PAYCONIQ.STATUS.EXPIRED]]',
          CANCELLED: '[[ORDER.CHECKOUT.PAYCONIQ.STATUS.CANCELLED]]',
          LOADING: '[[ORDER.CHECKOUT.PAYCONIQ.STATUS.LOADING]]',
        },
        BUTTON_RETRY: '[[ORDER.CHECKOUT.PAYCONIQ.BUTTON_RETRY]]',
        BUTTON_STOP: '[[ORDER.CHECKOUT.PAYCONIQ.BUTTON_STOP]]',
      },
      MERGE: {
        TITLE: '[[ORDER.CHECKOUT.MERGE.TITLE]]',
        EXPLANATION: '[[ORDER.CHECKOUT.MERGE.EXPLANATION]]',
        EXPLANATION_NEW: '[[ORDER.CHECKOUT.MERGE.EXPLANATION_NEW]]',
        BUTTON_NEW: '[[ORDER.CHECKOUT.MERGE.BUTTON_NEW]]',
        BUTTON_STOP: '[[ORDER.CHECKOUT.MERGE.BUTTON_STOP]]',
        ADD_CLIENT_NAME_MODAL: {
          TITLE: '[[ORDER.CHECKOUT.MERGE.ADD_CLIENT_NAME_MODAL.TITLE]]',
          CONTENT: '[[ORDER.CHECKOUT.MERGE.ADD_CLIENT_NAME_MODAL.CONTENT]]',
          ERROR_ALREADY_IN_USE: '[[ORDER.CHECKOUT.MERGE.ADD_CLIENT_NAME_MODAL.ERROR_ALREADY_IN_USE]]',
          INPUT_PLACEHOLDER: '[[ORDER.CHECKOUT.MERGE.ADD_CLIENT_NAME_MODAL.INPUT_PLACEHOLDER]]',
          BUTTON: '[[ORDER.CHECKOUT.MERGE.ADD_CLIENT_NAME_MODAL.BUTTON]]',
        },
        UNFINISHED: {
          TITLE: '[[ORDER.CHECKOUT.MERGE.UNFINISHED.TITLE]]',
          EXPLANATION: '[[ORDER.CHECKOUT.MERGE.UNFINISHED.EXPLANATION]]',
        },
      },
    },
    FINISHED: {
      EXPLANATION: {
        ORDER_PAID: '[[ORDER.FINISHED.EXPLANATION.ORDER_PAID]]',
        ADDED_CLIENT_NAME: '[[ORDER.FINISHED.EXPLANATION.ADDED_CLIENT_NAME]]',
        ORDERS_MERGED: '[[ORDER.FINISHED.EXPLANATION.ORDERS_MERGED]]',
      },
      BUTTON: '[[ORDER.FINISHED.BUTTON]]',
    },
    CONFIRM_DELETE: {
      BUTTON: '[[ORDER.CONFIRM_DELETE.BUTTON]]',
      CONTENT: '[[ORDER.CONFIRM_DELETE.CONTENT]]',
      TITLE: '[[ORDER.CONFIRM_DELETE.TITLE]]',
    },
  },
  ORDERS: {
    UNFINISHED: {
      TITLE: '[[ORDERS.UNFINISHED.TITLE]]',
      EXPLANATION: '[[ORDERS.UNFINISHED.EXPLANATION]]',
      NO_RESULTS: '[[ORDERS.UNFINISHED.NO_RESULTS]]',
      SIDEBAR: { CHECKOUT_ASAP: '[[ORDERS.UNFINISHED.SIDEBAR.CHECKOUT_ASAP]]' },
      ITEM: {
        NO_NAME: '[[ORDERS.UNFINISHED.ITEM.NO_NAME]]',
        CREATED_AT: '[[ORDERS.UNFINISHED.ITEM.CREATED_AT]]',
        BUTTON_CHECKOUT: '[[ORDERS.UNFINISHED.ITEM.BUTTON_CHECKOUT]]',
        BUTTON_ADD: '[[ORDERS.UNFINISHED.ITEM.BUTTON_ADD]]',
      },
    },
    CONFIRM_MERGE: {
      BUTTON: '[[ORDERS.CONFIRM_MERGE.BUTTON]]',
      CONTENT: '[[ORDERS.CONFIRM_MERGE.CONTENT]]',
      TITLE: '[[ORDERS.CONFIRM_MERGE.TITLE]]',
    },
  },
  SHARED: {
    BUTTONS: {
      CANCEL: '[[SHARED.BUTTONS.CANCEL]]',
      CREATE: '[[SHARED.BUTTONS.CREATE]]',
      DELETE: '[[SHARED.BUTTONS.DELETE]]',
      EDIT: '[[SHARED.BUTTONS.EDIT]]',
      SAVE: '[[SHARED.BUTTONS.SAVE]]',
    },
    NAVIGATION: { UNFINISHED_ORDERS: '[[SHARED.NAVIGATION.UNFINISHED_ORDERS]]' },
    PLACEHOLDER: {
      DATE: '[[SHARED.PLACEHOLDER.DATE]]',
      SEARCH: '[[SHARED.PLACEHOLDER.SEARCH]]',
      TIME: '[[SHARED.PLACEHOLDER.TIME]]',
    },
    LOADING_APPLICATION: '[[SHARED.LOADING_APPLICATION]]',
  },
  ERRORS: {
    GENERAL: '[[ERRORS.GENERAL]]',
    VALIDATION: {
      AFTER_DATE: '[[ERRORS.VALIDATION.AFTER_DATE]]',
      BEFORE_DATE: '[[ERRORS.VALIDATION.BEFORE_DATE]]',
      EMPTY_ARRAY: '[[ERRORS.VALIDATION.EMPTY_ARRAY]]',
      FORM: '[[ERRORS.VALIDATION.FORM]]',
      INVALID_NEW_AND_REPEATED_PASSWORD: '[[ERRORS.VALIDATION.INVALID_NEW_AND_REPEATED_PASSWORD]]',
      INVALID: '[[ERRORS.VALIDATION.INVALID]]',
      MAX_LENGTH: '[[ERRORS.VALIDATION.MAX_LENGTH]]',
      MIN_LENGTH: '[[ERRORS.VALIDATION.MIN_LENGTH]]',
      NOT_A_NUMBER: '[[ERRORS.VALIDATION.NOT_A_NUMBER]]',
      PASSWORD_TOO_SHORT: '[[ERRORS.VALIDATION.PASSWORD_TOO_SHORT]]',
      PASSWORD_UNSAFE: '[[ERRORS.VALIDATION.PASSWORD_UNSAFE]]',
      REQUIRED: '[[ERRORS.VALIDATION.REQUIRED]]',
    },
  },
};