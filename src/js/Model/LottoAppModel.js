import Model from '../core/Model.js';
import LottoModel from './Lotto/LottoModel.js';
import Payment from './Payment/Payment.js';

export default class LottoAppModel extends Model {
  lottoModel;

  init(callback) {
    const message = { lottoList: [] };

    this.lottoModel = new LottoModel();
    callback(message);
  }

  purchase(amount, callback) {
    const numberOfTicket = new Payment(amount).getNumberOfLotto();
    const message = {
      lottoList: this.lottoModel.purchase(numberOfTicket),
    };

    callback(message);
  }
}