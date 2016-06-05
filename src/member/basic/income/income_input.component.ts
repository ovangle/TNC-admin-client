import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {IncomeType, IncomeTypeSelect} from './type';
import {ProofOfLowIncome, ProofOfLowIncomeSelect} from './proof_of_low_income';
import {Benefit, BenefitInput} from './benefit';
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
        
        <benefit-input
            [benefit]="income.benefit"
            (benefitChange)="_benefitChanged($event)"
            [label]="'Centrelink benefit'"
            [disabled]="disabled">
        </benefit-input>  
        
        <proof-of-low-income-select
            [proofOfLowIncome]="income.proofOfLowIncome"
            (proofOfLowIncomeChange)="_proofOfLowIncomechanged($event)"
            [label]="'Proof of low income'"
            [disabled]="disabled">
        </proof-of-low-income-select>
    </fieldset>
    `,
    directives: [ProofOfLowIncomeSelect, IncomeTypeSelect, BenefitInput],
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

    get _isBenefitType(): boolean {
        return this.income.type === IncomeType.CentrelinkBenefit;
    }

    _incomeTypeChanged(type: IncomeType) {
        this.incomeChange.emit(
            <Income>this.income.set('type', type)
        );
    }

    _benefitChanged(benefit: Benefit) {
        this.incomeChange.emit(
            <Income>this.income.set('benefit', benefit)
        );
    }

    _proofOfLowIncomeChanged(proofOfLowIncome: ProofOfLowIncome) {
        this.incomeChange.emit(
            <Income>this.income.set('proofOfLowIncome', proofOfLowIncome)
        );
    }


}
