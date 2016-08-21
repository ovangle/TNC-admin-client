import {Observable} from 'rxjs/Observable';
import {Map} from 'immutable';

import {num, bool, str, map} from 'caesium-model/json_codecs';
import {isBlank} from 'caesium-core/lang';
import {Model, Property, RefProperty} from 'caesium-model/model';
import {Voucher} from '../voucher.model';
import {VoucherType} from '../voucher_type.model';

import {EnergyAccountType, EnergyAccountBill, ENERGY_ACCOUNT_BILL_CODEC} from './bill/bill.model';

@Model({kind: 'activity::EAPAVoucher', superType: Voucher})
export class EAPAVoucher extends Voucher {

    // Question 1
    @Property({codec: map(ENERGY_ACCOUNT_BILL_CODEC), defaultValue: Map})
    bills: Map<EnergyAccountType, EnergyAccountBill>;

    // Question 2
    @Property({codec: bool, defaultValue: () => false})
    isDenyingBasicNeeds: boolean;
    @Property({codec: bool, defaultValue: () => false})
    isFacingDisconnection: boolean;
    @Property({codec: bool, defaultValue: () => false})
    isDisconnected: boolean;

    get isFacingHardship(): boolean {
        return this.isDenyingBasicNeeds
            || this.isFacingDisconnection
            || this.isDisconnected;
    }

    // Question 3
    @Property({codec: bool, defaultValue: () => false})
    isGrantedLimitExemption: boolean;
    @Property({codec: str, defaultValue: () => ''})
    limitExemptionDescription: string;

    // Question 4
    @Property({codec: bool, defaultValue: () => false})
    isCustomerDeclarationSigned: boolean;

    // Question 5
    @Property({codec: bool, defaultValue: () => false})
    isAssessorDeclarationSigned: boolean;

    getType(): VoucherType {
        return 'EAPA';
    }

    // The total value of all sighted bills.
    totalBillValue(): number {
        return this.bills.valueSeq()
            .map(bill => isBlank(bill) ? 0 : bill.value)
            .reduce((acc, value) => acc + value, 0);
    }

    // The assessed value
    getValue(): number {
        var voucherValue = (Math.floor(this.totalBillValue() / 50) * 50);
        if (voucherValue <= 250 || this.isGrantedLimitExemption) {
            return voucherValue;
        }
        return 250;
    }

    get isValidLimitExemption(): boolean {
        return !this.isGrantedLimitExemption
            || (this.limitExemptionDescription !== '');
    }
}
