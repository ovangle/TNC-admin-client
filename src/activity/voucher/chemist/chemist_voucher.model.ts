import {Model, ModelBase} from 'caesium-model/model';

import {Voucher} from '../voucher.model';
import {VoucherType} from '../voucher_type.model';

@Model({kind: 'member::ChemistVoucher', superType: Voucher})
export abstract class ChemistVoucher extends Voucher {
    getType(): VoucherType { return 'CHEMIST'; }
}
