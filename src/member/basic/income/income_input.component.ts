import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {IncomeType, IncomeTypeSelect} from './type';
import {ProofOfLowIncome, ProofOfLowIncomeSelect} from './proof_of_low_income';
import {BenefitType, BenefitTypeSelect} from './benefit_type';
import {Income} from './income.model';

@Component({
    selector: 'income-input',
    template: `
    <fieldset>
        <legend>{{label}}</legend>
        
        <income-type-select 
            [incomeType]="income.type" 
            (incomeTypeChange)="_incomeTypeChanged($event)"
            [label]="'Primary income'"
            [disabled]="disabled">
        </income-type-select>
        
        <benefit-type-select 
            [label]="'Type'"
            [disabled]="disabled"
            [benefitType]="income.benefitType"
            (benefitTypeChange)="_benefitTypeChanged($event)">
        </benefit-type-select>        
    
        <div *ngIf="_isOtherBenefitType" class="form-control">
            <label for="other-type-input">Description</label>
            <input type="text" id="other-type-input"
                [ngModel]="income.benefitOtherDescription" 
                (ngModelChange)="_benefitOtherDescriptionChanged($event)">
        </div>
        
        <proof-of-low-income-select
            [proofOfLowIncome]="income.proofOfLowIncome"
            (proofOfLowIncomeChange)="_proofOfLowIncomechanged($event)"
            [label]="'Proof of low income'"
            [disabled]="disabled">
        </proof-of-low-income-select>
    </fieldset>
    `,
    directives: [ProofOfLowIncomeSelect, IncomeTypeSelect, BenefitTypeSelect],
    styles: [``],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncomeInput {
    @Input() income: Income;
    @Output() incomeChange = new EventEmitter<Income>();

    @Input() label: string;
    @Input() disabled: boolean;

    get _isOtherBenefitType(): boolean {
        return this.income.benefitType === BenefitType.Other;
    }

    _incomeTypeChanged(type: IncomeType) {
        this.incomeChange.emit(
            <Income>this.income.set('type', type)
        );
    }

    _benefitTypeChanged(benefitType: BenefitType) {
        this.incomeChange.emit(
            <Income>this.income.set('benefitType', benefitType)
        );
    }

    _benefitOtherDescriptionChanged(otherDescription: string) {
        this.incomeChange.emit(
            <Income>this.income.set('benefitOtherDescription', otherDescription)
        )

    }

    _proofOfLowIncomeChanged(proofOfLowIncome: ProofOfLowIncome) {
        this.incomeChange.emit(
            <Income>this.income.set('proofOfLowIncome', proofOfLowIncome)
        );
    }


}
