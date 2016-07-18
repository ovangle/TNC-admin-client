import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {EnumSelect2} from '../../../utils/enum';

import {IncomeType, IncomeTypeSelect} from './type';
import {ProofOfLowIncome, ProofOfLowIncomeSelect} from './proof_of_low_income';
import {BenefitType, BENEFIT_TYPE_VALUES} from './benefit_type.model';
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
            
            <enum-select2 class="input-right"
                    [ngClass]="{
                        'flex-2': !_isOtherBenefitType,
                        'flex-1': _isOtherBenefitType
                    }" 
                    [enumValues]="benefitTypeValues"
                    [label]="'Centrelink benefit'"
                    [value]="income.benefitType"
                    (valueChange)="propChanged('benefitType', $event)">
            </enum-select2>
        
        
            <div *ngIf="_isOtherBenefitType" class="form-group input-right flex-1">
                <label for="other-type-input">Other description</label>
                <input type="text" class="form-control" id="other-type-input"
                    [ngModel]="income.benefitOtherDescription" 
                    (ngModelChange)="propChanged('benefitOtherDescription', $event)">
            </div>
        </div>
      </fieldset>
    `,
    directives: [ProofOfLowIncomeSelect, IncomeTypeSelect],
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
    private benefitTypeValues = BENEFIT_TYPE_VALUES;

    @Input() income: Income;
    @Output() incomeChange = new EventEmitter<Income>();

    @Input() label: string;
    @Input() disabled: boolean;

    get _isOtherBenefitType(): boolean {
        return this.income.benefitType === 'OTHER';
    }

    private propChanged(prop: string, value: any) {
        this.incomeChange.emit(
            <Income>this.income.set(prop, value)
        );
    }
}
