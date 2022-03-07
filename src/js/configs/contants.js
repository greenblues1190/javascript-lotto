export const DOM_STRING = {
  APP: 'app',
  TITLE: 'title',
  SUBTITLE: 'subtitle',
  PAYMENT_SECTION: 'payment-section',
  TICKET_SECTION: 'ticket-section',
  WINNING_NUMBER_SECTION: 'winning-number-section',
  INPUT_FORM: 'input-form',
  HINT: 'hint',
  STYLED_INPUT: 'styled-input',
  SUBMIT_BUTTON: 'submit-button',
  PAYMENT_FORM: 'payment-form',
  PAYMENT_INPUT: 'payment-input',
  PAYMENT_SUBMIT: 'payment-submit',
  SWITCH: 'switch',
  SLIDER: 'slider',
  TICKET_LIST_WRAP: 'ticket-list-wrap',
  TICKET_LIST: 'ticket-list',
  TICKET_LIST_COLUMN: 'ticket-list-column',
  TICKET_LIST_ROW: 'ticket-list-row',
  TICKET: 'ticket',
  TICKET_NUMBERS: 'ticket-numbers',
  SHOW_NUMBER_TOGGLE_AREA: 'show-number-toggle-area',
  WINNING_NUMBER_FORM: 'winning-number-form',
  MAIN_NUMBER_FIELDSET: 'winning-number-fieldset',
  WINNING_NUMBER_LEGEND: 'winning-number-legend',
  MAIN_NUMBER_INPUT_WRAP: 'winning-number-input-wrap',
  WINNING_NUMBER_INPUT: 'winning-number-input',
  MAIN_NUMBER_INPUT: 'main-number-input',
  BONUS_NUMBER_FIELDSET: 'bonus-number-fieldset',
  BONUS_NUMBER_INPUT: 'bonus-number-input',
  SHOW_RESULT_BUTTON: 'show-result-button',
  RESULT_MODAL_WINDOW: 'result-modal-window',
  MODAL_OVERLAY: 'modal-overlay',
  MODAL_CLOSED: 'modal-closed',
  MODAL_WINDOW: 'modal-window',
  MODAL_CONTENT: 'modal-content',
  RESULT_TABLE: 'result-table',
  RESTART_BUTTON: 'restart-button',
};

export const LOTTO = {
  PRICE: 1000,
  NUMBER_LENGTH: 6,
  NUMBER_RANGE: {
    MIN: 1,
    MAX: 45,
  },
  PRIZE: {
    FIRST: {
      TITLE: '6개',
      AMOUNT: 2000000000,
      CONDITION: { matched: 6, isBonusNumberMatched: false },
    },
    SECOND: {
      TITLE: '5개+보너스볼',
      AMOUNT: 30000000,
      CONDITION: { matched: 5, isBonusNumberMatched: true },
    },
    THIRD: {
      TITLE: '5개',
      AMOUNT: 1500000,
      CONDITION: { matched: 5, isBonusNumberMatched: false },
    },
    FORTH: {
      TITLE: '4개',
      AMOUNT: 50000,
      CONDITION: { matched: 4, isBonusNumberMatched: false },
    },
    FIFTH: {
      TITLE: '3개',
      AMOUNT: 5000,
      CONDITION: { matched: 3, isBonusNumberMatched: false },
    },
  },
};

export const PAYMENT = {
  PURCHASE_AMOUNT: {
    MIN: 1000,
    MAX: 10000,
  },
};

export const ERROR_MESSAGE = {
  NOT_A_NUMBER: `입력된 금액이 숫자가 아닙니다. ${PAYMENT.PURCHASE_AMOUNT.MIN} 이상 ${PAYMENT.PURCHASE_AMOUNT.MAX} 이하의 금액을 입력해주세요.`,
  NOT_DIVIDED_BY_THOUSAND: `입력된 금액이 ${LOTTO.PRICE}으로 나누어 떨어지지 않습니다. ${LOTTO.PRICE}으로 나누어 떨어지는 금액을 입력해주세요.`,
  OUT_OF_PURCHASE_AMOUNT_RANGE: `입력된 금액이 ${PAYMENT.PURCHASE_AMOUNT.MIN} 사이가 아닙니다. ${PAYMENT.PURCHASE_AMOUNT.MIN} 이상 ${PAYMENT.PURCHASE_AMOUNT.MAX} 이하의 금액을 입력해주세요.`,
  NOT_INTEGER: '입력된 번호가 정수가 아닙니다. 정수를 입력해주세요.',
  OUT_OF_LOTTO_NUMBER_RANGE: `유효하지 않은 로또 번호가 있습니다. ${LOTTO.NUMBER_RANGE.MIN}부터 ${LOTTO.NUMBER_RANGE.MAX} 사이의 번호를 입력해주세요.`,
  DUPLICATED_NUMBER: `중복된 번호가 있습니다. 서로 다른 번호를 입력해주세요.`,
};
