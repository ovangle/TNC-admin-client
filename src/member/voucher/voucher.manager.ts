import {Type} from 'caesium-core/lang';
import {ManagerBase, ManagerOptions, SearchParameter} from 'caesium-model/manager';

import {Voucher} from './voucher.model';
import {ChemistVoucher} from './chemist';
import {EAPAVoucher} from './eapa';
import {FoodcareVoucher} from './foodcare';

export class VoucherManager extends ManagerBase<Voucher> {
    constructor(options: ManagerOptions) {
        super(options);
    }

    getModelType(): Type { return Voucher; }
    getModelSubtypes(): Type[] {
        return [ChemistVoucher, EAPAVoucher, FoodcareVoucher];
    }
    getSearchParameters(): SearchParameter[] {
        return undefined;
    }
}
