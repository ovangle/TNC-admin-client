import {ModelBase, Model, Property, RefProperty} from 'caesium-model/model';
import {VoucherType, VOUCHER_TYPE_VALUES} from './voucher_type.model';


@Model({kind: 'activity::Voucher', isAbstract: true})
export abstract class Voucher extends ModelBase {
    abstract getValue(): number;
    abstract getType(): VoucherType;
    abstract _getIsValid(): boolean;

    getDisplayType(): string {
        return VOUCHER_TYPE_VALUES.get(this.getType());
    }

    get isValid() { return this._getIsValid(); }

}

