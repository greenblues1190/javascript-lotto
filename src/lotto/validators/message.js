import validator from './validator.js';
import { MESSAGE } from '../../constants.js';

const message = {
  getCostValidation(cost) {
    if (validator.isMoneyLessThanMinCost(cost)) {
      return MESSAGE.SHOULD_EXCEED_MIN_COST;
    }
    if (validator.isChangeMoneyExist(cost)) {
      return MESSAGE.GET_SHOULD_NOT_HAVE_CHANGE_MESSAGE(cost);
    }

    return '';
  },

  getPurchaseAutoCountValidation(purchaseCount, remainCount) {
    if (validator.isPurchaseCountZero(purchaseCount)) {
      return MESSAGE.SHOULD_HAVE_PURCHASE_COUNT;
    }
    if (validator.isExceededRemainCount(purchaseCount, remainCount)) {
      return MESSAGE.GET_SHOULD_FILL_LESS_THAN_REMAIN_COUNT_MESSAGE(
        remainCount,
      );
    }

    return '';
  },

  getAllNumberValidation(allNumbers) {
    if (validator.isDuplicatedNumberExist(allNumbers)) {
      return MESSAGE.DUPLICATED_NUMBER_EXIST;
    }
    if (validator.isNumberOutOfRangeExist(allNumbers)) {
      return MESSAGE.NUMBER_RANGE_EXCEEDED;
    }

    return '';
  },
};

export default message;