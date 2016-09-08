import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {EnumSelect2} from '../../../utils/enum';

import {IncomeType, INCOME_TYPE_VALUES} from './income_type.model';
import {ProofOfLowIncome, PROOF_OF_LOW_INCOME_VALUES} from './proof_of_low_income.model';
import {BenefitType, BENEFIT_TYPE_VALUES} from './benefit_type.model';
import {Income} from './income.model';


@Component({
    selector: 'income-input',
    template: `
    <style>
    .input-right {
        margin-left: 30px;
    }    
    </style>
    <fieldset>
        <legend>{{label}}</legend>
        <div class="layout horizontal">
            <enum-select2 class="flex-2"
                [label]="'Primary income'" 
                [enumValues]="incomeTypeValues"
                [value]="income.type"
                (valueChange)="propChanged('type', $event)">
            </enum-select2>
            
            <enum-select2 class="flex-2 input-right"
                [enumValues]="proofOfLowIncomeValues" 
                [label]="'Proof of low income'"
                [value]="income.proofOfLowIncome"
                (valueChange)="propChanged('proofOfLowIncome', $event)">
            </enum-select2>
            
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
    directives: [EnumSelect2],
    styles: [
        require('bootstrap/dist/css/bootstrap.css'),
        require('css/flex.css')
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncomeInput {
    private proofOfLowIncomeValues = PROOF_OF_LOW_INCOME_VALUES;
    private benefitTypeValues = BENEFIT_TYPE_VALUES;
    private incomeTypeValues = INCOME_TYPE_VALUES;

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
