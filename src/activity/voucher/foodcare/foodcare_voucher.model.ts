import {Model, Property} from 'caesium-model/model';
import {bool, date, num} from 'caesium-model/json_codecs';

import {Voucher} from '../voucher.model';
import {VoucherType} from '../voucher_type.model';

@Model({kind: 'activity::FoodcareVoucher', superType: Voucher})
export abstract class FoodcareVoucher extends Voucher {
    /**
     * Foodcare voucher come in 5, 10, 15, 20 and 25 dollar selectedValues.
     */
    @Property({codec: num, defaultValue: () => 5})
    value: number;

    @Property({codec: date, readOnly: true})
    expires: Date;

    @Property({codec: bool, defaultValue: () => false})
    redeemed: boolean;

    getType(): VoucherType {
        return 'FOODCARE';
    }
}

