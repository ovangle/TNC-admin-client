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
        <div class="layout horizontal">
            <income-type-select 
                class="flex-2"
                [incomeType]="income.type" 
                (incomeTypeChange)="propChanged('type', $event)"
                [label]="'Primary income'"
                [disabled]="disabled">
            </income-type-select>
            
            <proof-of-low-income-select
                class="flex-2 input-right"
                [proofOfLowIncome]="income.proofOfLowIncome"
                (proofOfLowIncomeChange)="propChanged('proofOfLowIncome', $event)"
                [label]="'Proof of low income'"
                [disabled]="disabled">
            </proof-of-low-income-select>
        
            <benefit-type-select 
                [ngClass]="{
                    'input-right': true,
                    'flex-2': !_isOtherBenefitType,
                    'flex-1': _isOtherBenefitType
                }"
                [label]="'Centrelink benefit'"
                [disabled]="disabled"
                [benefitType]="income.benefitType"
                (benefitTypeChange)="propChanged('benefitType', $event)">
            </benefit-type-select>        
        
            <div *ngIf="_isOtherBenefitType" class="form-group input-right flex-1">
                <label for="other-type-input">Other description</label>
                <input type="text" class="form-control" id="other-type-input"
                    [ngModel]="income.benefitOtherDescription" 
                    (ngModelChange)="propChanged('benefitOtherDescription', $event)">
            </div>
        </div>
      </fieldset>
    `,
    directives: [ProofOfLowIncomeSelect, IncomeTypeSelect, BenefitTypeSelect],
    styles: [`
    .input-right {
        margin-left: 30px;
    }    
    `],
    styleUrls: [
        'assets/css/flex.css',
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

    private propChanged(prop: string, value: any) {
        this.incomeChange.emit(
            <Income>this.income.set(prop, value)
        );
    }
}
