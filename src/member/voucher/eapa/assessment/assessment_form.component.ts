import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import {EAPAAssessment} from './assessment.model';

@Component({
    selector: 'eapa-assessment-form',
    // TODO: Template URL should be relative to module location
    templateUrl: 'src/member/voucher/eapa/assessment/assessment_form.component.html',
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class EAPAAssessmentForm {
    @Input() assessment:EAPAAssessment;
    @Output() assessmentChange = new EventEmitter<EAPAAssessment>();

    _isNoRelationToAssessorChanged(value:boolean) {
        this.assessmentChange.emit(
            <EAPAAssessment>this.assessment.set('isNoRelationToAssessor', value)
        );
    }

    _billSightedChanged(value:boolean) {
        this.assessmentChange.emit(
            <EAPAAssessment>this.assessment.set('billSighted', value)
        );
    }

    _isNameOnBillChanged(value:boolean) {
        this.assessmentChange.emit(
            <EAPAAssessment>this.assessment.set('isNameOnBill', value)
        )
    }

    _isAddressOnBillChanged(value:boolean) {
        this.assessmentChange.emit(
            <EAPAAssessment>this.assessment.set('isAddressOnBill', value)
        )
    }

    _isResidentialElectricityOrGasAccountChanged(value:boolean) {
        this.assessmentChange.emit(
            <EAPAAssessment>this.assessment.set('isResidentialOrGasAccount', value)
        )
    }

    _isExperiencingFinancialHardshipChanged(value:boolean) {
        this.assessmentChange.emit(
            <EAPAAssessment>this.assessment.set('isExperiencingFinancialHardship', value)
        )
    }

    _isDenyingBasicNeedsChanged(value:boolean) {
        this.assessmentChange.emit(
            <EAPAAssessment>this.assessment.set('isDenyingBasicNeeds', value)
        )
    }

    _isFacingDisconnectionChanged(value:boolean) {
        this.assessmentChange.emit(
            <EAPAAssessment>this.assessment.set('isFacingDisconnection', value)
        )
    }

    _isDisconnectedChanged(value:boolean) {
        this.assessmentChange.emit(
            <EAPAAssessment>this.assessment.set('isDisconnected', value)
        )
    }

    _hasContactedRetailerToCheckAssistanceOptionsChanged(value:boolean) {
        this.assessmentChange.emit(
            <EAPAAssessment>this.assessment.set('hasContactedRetailerToCheckAssistanceOptions', value)
        )
    }

    _hasContactedRetailerToCheckEnergyRebates(value:boolean) {
        this.assessmentChange.emit(
            <EAPAAssessment>this.assessment.set('hasContactedRetailerToCheckEnergyRebates', value)
        )
    }

    _hasContactedRetailerToCheckUpdatedBalanceChanged(value:boolean) {
        this.assessmentChange.emit(
            <EAPAAssessment>this.assessment.set('hasContactedRetailerToCheckUpdatedBalance', value)
        )
    }

    _hasContactedRetailerToCheckEapaPaymentsChanged(value:boolean) {
        this.assessmentChange.emit(
            <EAPAAssessment>this.assessment.set('hasContactedRetailerToCheckEAPAPayments', value)
        )
    }

    _isReceivingOverLimitOnCurrentBillChanged(value:boolean) {
        this.assessmentChange.emit(
            <EAPAAssessment>this.assessment.set('isReceivingOverLimitOnCurrentBill', value)
        )
    }

    _isReceivingOverLimitForFinancialYearChanged(value:boolean) {
        this.assessmentChange.emit(
            <EAPAAssessment>this.assessment.set('isReceivingOverLimitForFinancialYear', value)
        )
    }

    _isReceivingMoreThanTwiceChanged(value:boolean) {
        this.assessmentChange.emit(
            <EAPAAssessment>this.assessment.set('isReceivingMorethanTwice', value)
        )
    }

    _limitExemptionReasonChanged(value:string) {
        this.assessmentChange.emit(
            <EAPAAssessment>this.assessment.set('limitExemptionReason', value)
        )
    }

    _signedPrivacyAgreementChanged(value:boolean) {
        this.assessmentChange.emit(
            <EAPAAssessment>this.assessment.set('signedPrivacyAgreement', value)
        )
    }

    _isBillStampedChanged(value:boolean) {
        this.assessmentChange.emit(
            <EAPAAssessment>this.assessment.set('isBillStamped', value)
        )
    }

    _understoodVoucherProcessingChanged(value:boolean) {
        this.assessmentChange.emit(
            <EAPAAssessment>this.assessment.set('understoodVoucherProcessing', value)
        )
    }

    _consentToRetainDataChanged(value:boolean) {
        this.assessmentChange.emit(
            <EAPAAssessment>this.assessment.set('consentToRetainData', value)
        );
    }
}

