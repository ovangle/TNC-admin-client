import moment = require('moment');

import {List} from 'immutable';
import {Observable} from 'rxjs/Observable';

import {Model, ModelBase, Property} from 'caesium-model/model';
import {bool, list, str} from 'caesium-model/json_codecs';

import {startOfFinancialYear} from '../../../utils/date';
import {Member} from '../../../member';

import {Voucher} from '../voucher.model';
import {VoucherManager} from '../voucher.manager';
import {VoucherType} from '../voucher_type.model';

import {ChemistPrescription, CHEMIST_PRESCRIPTION_CODEC} from './prescription';

export const MAX_VOUCHERS_PER_FINANCIAL_YEAR = 6;
export const MAX_VOUCHER_VALUE = 30.00 /* AUD */;

@Model({kind: 'member::ChemistVoucher', superType: Voucher})
export abstract class ChemistVoucher extends Voucher {
    @Property({codec: list(CHEMIST_PRESCRIPTION_CODEC), defaultValue: List})
    prescriptions: List<ChemistPrescription>;

    @Property({codec: bool, defaultValue: () => false})
    isGrantedLimitExemption: boolean;

    @Property({codec: str, defaultValue: () => ''})
    limitExemptionDescription: string;

    @Property({codec: bool, defaultValue: () => false})
    isAssessorDeclarationSigned: boolean;

    getType(): VoucherType { return 'CHEMIST'; }

    getExemptionRequired(voucherManager: VoucherManager, member: Member): Observable<boolean> {
        let today = moment();


        let numChemistVouchersIssued = voucherManager.getVouchersForMember(member, {
            type: 'CHEMIST',
            after: today.clone().subtract(1, 'month').toDate(),
            before: today.toDate()
        }).map(results => results.count());

        return numChemistVouchersIssued
            .map(numIssued => {
                // An explicit exemption is required if there have been
                // - more than 6 chemist vouchers issued in the same year
                // - The total value of the prescription is greater than $30.
                return numIssued <= 6
                    && this.getValue() <= MAX_VOUCHER_VALUE;
            });

    }

    getValue(): number {
        let totalValueOfPrescriptions = this.prescriptions.reduce(
            (acc, prescription) => acc + prescription.value,
            0
        );

        if (this.isGrantedLimitExemption) {
            return totalValueOfPrescriptions;
        }

        return Math.min(totalValueOfPrescriptions, 30);
    }

    _getIsValid(): boolean {
        return false;
    }

}
