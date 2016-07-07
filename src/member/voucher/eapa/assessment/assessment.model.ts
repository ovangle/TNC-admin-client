import {Record} from 'immutable';

import {recordCodec, bool, str} from 'caesium-model/json_codecs';

export const _EAPA_ASSESSMENT_RECORD = Record({
    // Question 1
    isNoRelationToAssessor: false,

    // Question 2
    billSighted: false,

    // Question 3
    isNameOnBill: false,
    isAddressOnBill: false,

    // Question 4
    isResidentialElectricityOrGasAccount: false,

    // Question 5 (a)
    isExperiencingFinancialHardship: false,

    // Question 5 (b)
    isDenyingBasicNeeds: false,
    isFacingDisconnection: false,
    isDisconnected: false,

    // Question 6
    hasContactedRetailerToCheckAssistanceOptions: false,
    hasContactedRetailerToCheckEnergyRebates: false,
    hasContactedRetailerToCheckUpdatedBalance: false,
    hasContactedRetailerToCheckEapaPayments: false,

    // Question 7
    isReceivingOverLimitOnCurrentBill: false,
    isReceivingOverLimitForFinancialYear: false,
    isReceivingMoreThanTwice: false,

    limitExemptionDescription: '',

    // Question 8
    signedPrivacyAgreement: false,

    // Question 9
    isBillStamped: false,

    // Question 10
    understoodVoucherProcessing: false,

    // Question 11
    consentToRetainData: false
});

export class EAPAAssessment extends _EAPA_ASSESSMENT_RECORD {

    // Question 1
    isNoRelationToAssessor: boolean;

    // Question 2
    billSighted: boolean;

    // Question 3
    isNameOnBill: boolean;
    isAddressOnBill: boolean;

    // Question 4
    isResidentialElectricityOrGasAccount: boolean;

    // Question 5 (a)
    isExperiencingFinancialHardship: boolean;

    // Question 5 (b)
    isDenyingBasicNeeds: boolean;
    isFacingDisconnection: boolean;
    isDisconnected: boolean;

    // Question 6
    hasContactedRetailerToCheckAssistanceOptions: boolean;
    hasContactedRetailerToCheckEnergyRebates: boolean;
    hasContactedRetailerToCheckUpdatedBalance: boolean;
    hasContactedRetailerToCheckEapaPayments: boolean;

    // Question 7
    isReceivingOverLimitOnCurrentBill: boolean;
    isReceivingOverLimitForFinancialYear: boolean;
    isReceivingMoreThanTwice: boolean;

    get requiresLimitExemption(): boolean {
        return this.isReceivingOverLimitOnCurrentBill
            || this.isReceivingOverLimitForFinancialYear
            || this.isReceivingMoreThanTwice;
    }
    limitExemptionDescription: string;

    // Question 8
    signedPrivacyAgreement: boolean;

    // Question 9
    isBillStamped: boolean;

    // Question 10
    understoodVoucherProcessing: boolean;

    // Question 11
    consentToRetainData: boolean;
}

export const EAPA_ASSESSMENT_CODEC = recordCodec<EAPAAssessment>({
    // Question 1
    isNoRelationToAssessor: bool,

    // Question 2
    billSighted: bool,

    // Question 3
    isNameOnBill: bool,
    isAddressOnBill: bool,

    // Question 4
    isResidentialElectricityOrGasAccount: bool,

    // Question 5 (a)
    isExperiencingFinancialHardship: bool,

    // Question 5 (b)
    isDenyingBasicNeeds: bool,
    isFacingDisconnection: bool,
    isDisconnected: bool,

    // Question 6
    hasContactedRetailerToCheckAssistanceOptions: bool,
    hasContactedRetailerToCheckEnergyRebates: bool,
    hasContactedRetailerToCheckUpdatedBalance: bool,
    hasContactedRetailerToCheckEapaPayments: bool,

    // Question 7
    isReceivingOverLimitOnCurrentBill: bool,
    isReceivingOverLimitForFinancialYear: bool,
    isReceivingMoreThanTwice: bool,
    limitExemptionDescription: str,

    // Question 8
    signedPrivacyAgreement: bool,

    // Question 9
    isBillStamped: bool,

    // Question 10
    understoodVoucherProcessing: bool,

    // Question 11
    consentToRetainData: bool,
}, (args) => new EAPAAssessment(args));
