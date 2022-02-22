import LottoApp from '../LottoApp.js';
import { validator, isValidLottoNumberRange } from '../utils/validator.js';

describe('금액이 입력되면', () => {
  test('발급할 로또 개수를 구할 수 있어야 한다.', () => {
    const chargeAmount = 2000;

    expect(LottoApp.getNumberOfLotto(chargeAmount)).toBe(2);
  });

  describe('유효성을 검증하여', () => {
    test('숫자가 아니면 에러를 throw한다.', () => {
      const chargeAmount = '만원';

      expect(() => {
        validator.checkChargeAmount(chargeAmount);
      }).toThrowError('입력된 금액이 숫자가 아닙니다. 1000 이상 10000 이하의 금액을 입력해주세요.');
    });

    test('1000으로 나눠서 안떨어지는 금액이 입력되면 에러를 throw한다.', () => {
      const chargeAmount = 1001;

      expect(() => {
        validator.checkChargeAmount(chargeAmount);
      }).toThrowError(
        '1000으로 나누어 떨어지지 않습니다. 1000으로 나누어 떨어지는 금액을 입력해주세요.'
      );
    });

    test('1000부터 10000 사이가 아니면 에러를 throw한다.', () => {
      const firstChargeAmount = 0;
      const secondChargeAmount = 11000;

      expect(() => {
        validator.checkChargeAmount(firstChargeAmount);
      }).toThrowError(
        '입력된 금액이 1000부터 10000 사이가 아닙니다. 1000 이상 10000 이하의 금액을 입력해주세요.'
      );

      expect(() => {
        validator.checkChargeAmount(secondChargeAmount);
      }).toThrowError(
        '입력된 금액이 1000부터 10000 사이가 아닙니다. 1000 이상 10000 이하의 금액을 입력해주세요.'
      );
    });
  });
});

describe('로또 번호를 생성하여', () => {
  test('생성된 로또 번호가 정수여야한다.', () => {
    expect(Number.isInteger(LottoApp.generateLottoNumber())).toBe(true);
  });

  test('생성된 로또 번호가 1부터 45 사이여야 한다.', () => {
    expect(isValidLottoNumberRange(LottoApp.generateLottoNumber())).toBe(true);
  });
});
