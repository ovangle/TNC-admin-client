import moment = require('moment');

import {Model, Property, modelFactory} from 'caesium-json/model';
import {bool, str} from 'caesium-json/json_codecs';

import {Voucher} from '../voucher.model';
import {VoucherType} from '../voucher_type.model';

import {ChemistPrescription, CHEMIST_PRESCRIPTION_CODEC} from './prescription';

export const MAX_VOUCHERS_PER_FINANCIAL_YEAR = 6;
export const MAX_VOUCHER_VALUE = 30.00 /* AUD */;

export interface ChemistVoucherLimitExemption {
    maxVouchersExceeded?: boolean;
    maxValueExceeded?: boolean;
}

export interface ChemistVoucherErrors {
    noNameOnPrescription?: boolean;
    invalidPrescriptionRecipient?: boolean;
    noLimitExemptionDescription?: boolean;
    assessorDeclarationNotSigned?: boolean;
}

@Model({kind: 'member::ChemistVoucher', superType: Voucher})
export class ChemistVoucher extends Voucher {
    @Property({
        codec: CHEMIST_PRESCRIPTION_CODEC,
        defaultValue: () => new ChemistPrescription()
    })
    prescription: ChemistPrescription;

    @Property({codec: bool, defaultValue: () => false})
    isGrantedLimitExemption: boolean;

    @Property({codec: str, defaultValue: () => ''})
    limitExemptionDescription: string;

    @Property({codec: bool, defaultValue: () => false})
    isAssessorDeclarationSigned: boolean;

    getType(): VoucherType { return 'CHEMIST'; }

    getValue(): number {
        let prescriptionValue = this.prescription.value;

        if (this.isGrantedLimitExemption) {
            return prescriptionValue;
        }

        return Math.min(prescriptionValue, 30);
    }

    getErrors(): ChemistVoucherErrors {
        let errors = null;

        if (this.prescription.name === '') {
            errors = Object.assign({}, errors, {
                noNameOnPrescription: true
            });
        }

        if (this.prescription.recipient === null) {
            errors = Object.assign({}, errors, {
                invalidPrescriptionRecipient: true
            });
        }

        if (this.isGrantedLimitExemption && this.limitExemptionDescription === '') {
            errors = Object.assign({}, errors, {
                noLimitExemptionDescription: true
            });
        }

        if (!this.isAssessorDeclarationSigned) {
            errors = Object.assign({}, errors, {
                assessorDeclarationNotSigned: true
            });
        }

        return errors;
    }

    _getIsValid(): boolean {
        return this.getErrors() === null;
    }


    get limitExemption(): ChemistVoucherLimitExemption | null {
        let limitExemption = null;

        if (this.vouchersInFinancialYear > MAX_VOUCHERS_PER_FINANCIAL_YEAR) {
            limitExemption = Object.assign({}, limitExemption, {
                maxVouchersExceeded: true
            });
        }

        if (this.prescription.value > MAX_VOUCHER_VALUE) {
            limitExemption = Object.assign({}, limitExemption, {
                maxValueExceeded: true
            });
        }
        console.log('limit exemption', limitExemption);

        return limitExemption;
    }
}

export const chemistVoucher = modelFactory(ChemistVoucher);
