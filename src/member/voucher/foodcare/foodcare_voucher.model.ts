import {Model, Property} from 'caesium-model/model';
import {bool, date, num} from 'caesium-model/json_codecs';

import {Voucher} from '../voucher.model';

@Model({kind: 'member.voucher::ChemistVoucher', superType: Voucher})
export abstract class FoodcareVoucher extends Voucher {
    /**
     * Foodcare vouchers come in 5, 10, 15, 20 and 25 dollar values.
     */
    @Property({codec: num})
    value: number;

    @Property({codec: date})
    expires: Date;

    @Property({codec: bool, defaultValue: () => false})
    redeemed: boolean;

}

