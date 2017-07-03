import {
    Component, Input, ChangeDetectionStrategy
} from '@angular/core';

import {Income} from './income.model';

import {BenefitType, BENEFIT_TYPE_VALUES} from './benefit_type.model';
import {IncomeType, INCOME_TYPE_VALUES} from './income_type.model';
import {ProofOfLowIncome, PROOF_OF_LOW_INCOME_VALUES} from './proof_of_low_income.model';


@Component({
    selector: 'income-display',
    template: `
    <h3>Income</h3>
    <ul class="list-unstyled">
        <li class="clearfix">
            <span class="display-label col-sm-3">Type</span> 
            <span class="display-value col-sm-9">{{incomeType}}</span>
        </li> 
        <li class="clearfix">
            <span class="display-label col-sm-3">Benefit</span>
            <span class="display-value col-sm-9">{{benefitType}}</span>
        </li>
        <li class="clearfix">
            <span class="display-label col-sm-3">Proof of low income</span> 
            <span class="display-value col-sm-9">{{proofOfLowIncome}}</span>
        </li>
    </ul>
    `,
    styles: [`
    :host {display: block; }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncomeDisplay {
    @Input() income: Income;

    get incomeType(): string {
        let type: IncomeType = this.income ? this.income.type : 'NOT_DISCLOSED';
        return INCOME_TYPE_VALUES.get(type);
    }

    get benefitType(): string {
        let type: BenefitType = this.income ? this.income.benefitType: 'NOT_DISCLOSED';
        return BENEFIT_TYPE_VALUES.get(type);
    }

    get proofOfLowIncome(): string {
        let value: ProofOfLowIncome = this.income ? this.income.proofOfLowIncome: 'NO_PROOF';
        return PROOF_OF_LOW_INCOME_VALUES.get(value);
    }
}
