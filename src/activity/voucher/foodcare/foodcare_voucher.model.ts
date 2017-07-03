import moment = require('moment');
import {Model, Property, modelFactory} from 'caesium-json/model';
import {bool, date, num} from 'caesium-json/json_codecs';

import {Voucher} from '../voucher.model';
import {VoucherType} from '../voucher_type.model';

@Model({kind: 'activity::FoodcareVoucher', superType: Voucher})
export class FoodcareVoucher extends Voucher {
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

    _getIsValid(): boolean {
        return true;
    }

    getValue(): number {
        return this.value;
    }

}

export const foodcareVoucher = modelFactory(FoodcareVoucher);

