import {
  validate,
  purchaseAmountValidator,
  winningNumbersValidator,
  isValidLottoList,
  isValidLotto,
} from '../utils/validator.js';
import { concatWinningNumbers } from '../utils/utils.js';
import { ERROR_MESSAGE } from '../configs/contants.js';
import LottoModel from '../models/LottoModel.js';
import AppController from '../controllers/AppController.js';
import Lotto from '../models/Lotto/Lotto.js';

describe('Step 1', () => {
  describe('LottoModel', () => {
    describe('getLottoCount', () => {
      const purchaseAmount = 2000;

      test('금액이 주어지면 발급할 로또 개수를 반환해야 한다.', () => {
        expect(LottoModel.getLottoCount(purchaseAmount)).toBe(2);
      });
    });

    describe('issueLotto', () => {
      test('6개의 중복없는 번호를 가진 로또를 생성해 반환해야 한다.', () => {
        const lotto = LottoModel.issueLotto();

        expect(isValidLotto(lotto)).toBe(true);
      });
    });
  });

  describe('AppController', () => {
    const testModels = {
      lottoModel: new LottoModel(),
    };
    testModels.lottoModel.update({ lottoList: [] });

    const appController = new AppController(testModels);

    describe('autoPickLotto', () => {
      test('주어진 개수만큼 Lotto 객체를 생성해 lottoList에 저장해야 한다.', () => {
        const lottoCount = 6;
        const { lottoList } = appController.autoPickLotto(lottoCount);

        expect(isValidLottoList(lottoList, lottoCount)).toBe(true);
      });
    });
  });

  describe('util', () => {
    describe('validator', () => {
      test('주어진 금액이 숫자가 아니면 에러를 throw한다.', () => {
        const purchaseAmount = '만원';

        expect(() => {
          validate(purchaseAmount, purchaseAmountValidator);
        }).toThrowError(ERROR_MESSAGE.NOT_A_NUMBER);
      });

      test('주어진 금액이 1000 단위가 아닌 금액이 입력되면 에러를 throw한다.', () => {
        const purchaseAmount = 1001;

        expect(() => {
          validate(purchaseAmount, purchaseAmountValidator);
        }).toThrowError(ERROR_MESSAGE.NOT_DIVIDED_BY_THOUSAND);
      });

      test('주어진 금액이 1000부터 10000 사이가 아니면 에러를 throw한다.', () => {
        const firstPurchaseAmount = 0;
        const secondPurchaseAmount = 11000;

        expect(() => {
          validate(firstPurchaseAmount, purchaseAmountValidator);
        }).toThrowError(ERROR_MESSAGE.OUT_OF_PURCHASE_AMOUNT_RANGE);

        expect(() => {
          validate(secondPurchaseAmount, purchaseAmountValidator);
        }).toThrowError(ERROR_MESSAGE.OUT_OF_PURCHASE_AMOUNT_RANGE);
      });
    });
  });
});

describe('Step 2', () => {
  describe('Lotto', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    describe('matchWinningNumbers', () => {
      test('당첨 번호가 주어지면 구매한 로또의 당첨 결과를 구할 수 있어야 한다.', () => {
        expect(
          lotto.matchWinningNumbers({
            main: [1, 2, 3, 4, 5, 6],
            bonus: 7,
          })
        ).toBe('FIRST');

        expect(
          lotto.matchWinningNumbers({
            main: [1, 2, 3, 4, 5, 7],
            bonus: 6,
          })
        ).toBe('SECOND');

        expect(
          lotto.matchWinningNumbers({
            main: [39, 40, 41, 42, 43, 44],
            bonus: 45,
          })
        ).toBe(null);
      });
    });
  });

  describe('AppController', () => {
    const testModels = {
      lottoModel: new LottoModel(),
    };
    testModels.lottoModel.update({ lottoList: [] });

    const appController = new AppController(testModels);
    appController.manualPickLotto([
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 7],
      [1, 2, 3, 4, 5, 45],
      [1, 2, 3, 4, 44, 45],
      [1, 2, 3, 4, 44, 45],
      [1, 2, 3, 43, 44, 45],
      [1, 2, 3, 43, 44, 45],
      [40, 41, 42, 43, 44, 45],
      [40, 41, 42, 43, 44, 45],
      [40, 41, 42, 43, 44, 45],
    ]);

    describe('checkResult', () => {
      test('당첨 번호가 주어지면 당첨 결과를 구할 수 있어야 한다.', () => {
        const winningNumbers = {
          main: [1, 2, 3, 4, 5, 6],
          bonus: 7,
        };
        const { rankCount, totalPrizes, rateOfReturn } =
          appController.checkResult(winningNumbers);

        expect(rankCount).toStrictEqual({
          FIRST: 1,
          SECOND: 1,
          THIRD: 1,
          FORTH: 2,
          FIFTH: 2,
        });
        expect(totalPrizes).toBe(2031610000);
        expect(rateOfReturn).toBe((2031610000 - 10000) / 10000);
      });
    });
  });

  describe('util', () => {
    describe('validator', () => {
      test('번호들이 정수가 아니면 에러를 throw한다.', () => {
        const winningNumbers = {
          main: [0.1, 2, 3, 4, 5, 6],
          bonus: 'seven',
        };

        expect(() => {
          validate(
            winningNumbers,
            winningNumbersValidator,
            concatWinningNumbers
          );
        }).toThrowError(ERROR_MESSAGE.NOT_INTEGER);
      });

      test('번호들이 1부터 45 사이가 아니면 에러를 throw한다.', () => {
        const winningNumbers = {
          main: [0, 2, 3, 4, 5, 6],
          bonus: 46,
        };

        expect(() => {
          validate(
            winningNumbers,
            winningNumbersValidator,
            concatWinningNumbers
          );
        }).toThrowError(ERROR_MESSAGE.OUT_OF_LOTTO_NUMBER_RANGE);
      });
      test('중복되는 번호가 있으면 에러를 throw한다.', () => {
        const winningNumbers = {
          main: [1, 1, 3, 4, 5, 6],
          bonus: 7,
        };

        expect(() => {
          validate(
            winningNumbers,
            winningNumbersValidator,
            concatWinningNumbers
          );
        }).toThrowError(ERROR_MESSAGE.DUPLICATED_NUMBER);
      });
    });
  });
});
