import {Record} from 'immutable';

import {recordCodec, bool, str} from 'caesium-model/json_codecs';

export const _EAPA_ASSESSMENT_RECORD = Record({
    isMemberNoRelationToAssessor: false,
    billSighted: false,

    isMemberNameOnBill: false,
    isMemberAddressOnBill: false,
    isResidentialElectricityOrGasAccount: false,
    isMemberExperiencingFinancialHardship: false,
    isMemberDenyingBasicNeeds: false,
    isMemberFacingDisconnection: false,

    hasContactedRetailerToCheckPaymentPlans: false,
    hasContactedRetailerToCheckEnergyRebates: false,
    hasContactedRetailerToCheckUpdatedBalance: false,
    hasContactedRetailerToCheckEAPAPayments: false,

    isMemberReceivingOver250OnCurrentBill: false,
    isMemberReceivingOver500OverFinancialYear: false,
    isMemberRecieivingExemptionDescription: '',

    hasMemberAgreedtoPrivacyNotice: false,

    isBillStamped: false,

    hasMemberUnderstoodVoucherValidity: false,

    hasMemberConsentedToRetainingForm: false
});

export class EAPAAssessment extends _EAPA_ASSESSMENT_RECORD {

    // Question 1
    isMemberNoRelationToAssessor: boolean;

    // Question 2
    billSighted: boolean;

    // Question 3
    isMemberNameOnBill: boolean;
    isMemberAddressOnBill: boolean;

    // Question 4
    isResidentialElectricityOrGasAccount: boolean;

    // Question 5 (a)
    isMemberExperiencingFinancialHardship: boolean;

    // Question 5 (b)
    isMemberDenyingBasicNeeds: boolean;
    isMemberFacingDisconnection: boolean;
    isMemberDisconnected: boolean;

    // Question 6
    hasContactedRetailerToCheckAssistanceOptions: boolean;
    hasContactedRetailerToCheckEnergyRebates: boolean;
    hasContactedRetailerToCheckUpdatedBalance: boolean;
    hasContactedRetailerToCheckEAPAPayments: boolean;

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
    isMemberNoRelationToAssessor: bool,
    billSighted: bool,
    isMemberNameOnBill: bool,
    isMemberAddressOnBill: bool,
    isResidentialElectricityOrGasAccount: bool,
    isMemberExperiencingFinancialHardship: bool,
    isMemberDenyingBasicNeeds: bool,
    isMemberFacingDisconnection: bool,

    hasContactedRetailerToCheckPaymentPlans: bool,
    hasContactedRetailerToCheckEnergyRebates: bool,
    hasContactedRetailerToCheckUpdatedBalance: bool,
    hasContactedRetailerToCheckEAPAPayments: bool,

    isMemberReceivingOver250OnCurrentBill: bool,
    isMemberReceivingOver500OverFinancialYear: bool,
    isMemberRecieivingExemptionDescription: str,

    hasMemberAgreedtoPrivacyNotice: bool,

    isBillStamped: bool,

    hasMemberUnderstoodVoucherValidity: bool,

    hasMemberConsentedToRetainingForm: bool
}, (args) => new EAPAAssessment(args));
