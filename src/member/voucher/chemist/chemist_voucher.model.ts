import {Model, ModelBase} from 'caesium-model/model';

import {Voucher} from '../voucher.model';

@Model({kind: 'member.voucher::ChemistVoucher', superType: Voucher})
export abstract class ChemistVoucher extends Voucher {

}
