import {Observable} from 'rxjs/Observable';
import {List, Map} from 'immutable';

import {num, bool, str, list, map} from 'caesium-model/json_codecs';
import {isBlank} from 'caesium-core/lang';
import {Model, Property, RefProperty} from 'caesium-model/model';
import {Voucher} from '../voucher.model';
import {VoucherType} from '../voucher_type.model';
import {EAPAVoucherBook, EAPA_VOUCHER_BOOK_CODEC, VOUCHER_DOLLAR_VALUE,
        isVoucherBooksValid} from './voucher_book';

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

    /*
    @Property({codec: num, defaultValue: () => void 0})
    firstVoucherId: number;
    */

    @Property({codec: list(EAPA_VOUCHER_BOOK_CODEC), defaultValue: List})
    voucherBooks: List<EAPAVoucherBook>;

    getType(): VoucherType {
        return 'EAPA';
    }

    set(prop: string, value: any): EAPAVoucher {
        if (prop === 'voucherBooks') {
            console.log('FINAL', value.toJS());
        }
        return <EAPAVoucher>super.set(prop, value);
    }

    /**
     * The number of physical vouchers required to complete the assessment.
     */
    get numVouchersRequired(): number {
        return Math.floor(this.getValue() / VOUCHER_DOLLAR_VALUE);
    }

    // The total value of all sighted bills.
    totalBillValue(): number {
        return this.bills.valueSeq()
            .map(bill => isBlank(bill) ? 0 : bill.value)
            .reduce((acc, value) => acc + value, 0);
    }

    // The assessed value
    getValue(): number {
        return 2000;
        /*
        var voucherValue = (Math.floor(this.totalBillValue() / 50) * 50);
        if (voucherValue <= 250 || this.isGrantedLimitExemption) {
            return voucherValue;
        }
        return 250;
        */
    }

    get isBillsValid(): boolean {
        return !this.bills.isEmpty()
            && this.bills.every(bill => bill.isValid);
    }

    get isVoucherBooksValid(): boolean {
        return isVoucherBooksValid(this.voucherBooks, this.getValue());
    }


    _getIsValid(): boolean {
        return this.isValidLimitExemption
            && this.isFacingHardship
            && this.isCustomerDeclarationSigned
            && this.isAssessorDeclarationSigned
            && this.isBillsValid
            && this.isVoucherBooksValid;
    }

    get isValidLimitExemption(): boolean {
        return !this.isGrantedLimitExemption
            || this.limitExemptionDescription !== '';
    }
}
