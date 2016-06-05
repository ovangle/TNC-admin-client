
import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    PipeTransform
} from '@angular/core'

import {EnumSelect} from '../../../../utils/components/enum_select.component';

import {ProofOfLowIncome, PROOF_OF_LOW_INCOME_VALUES} from './proof_of_low_income.model';
import {ProofOfLowIncomePipe} from './proof_of_low_income.pipe';


@Component({
    selector: 'proof-of-low-income-select',
    template: `
    <enum-select [enumValues]="proofOfLowIncomeValues"
                 [enumPipe]="proofOfLowIncomePipe" 
                 [label]="label"
                 [disabled]="disabled"
                 [value]="proofOfLowIncome"
                 (valueChange)="proofOfLowIncomeChange.emit($event)">
    </enum-select>
    `,
    directives: [EnumSelect],
    providers: [ProofOfLowIncomePipe],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProofOfLowIncomeSelect {
    proofOfLowIncomeValues = PROOF_OF_LOW_INCOME_VALUES;
    proofOfLowIncomePipe: PipeTransform;

    @Input() proofOfLowIncome: ProofOfLowIncome;
    @Output() proofOfLowIncomeChange= new EventEmitter<ProofOfLowIncome>();

    @Input() label: string;
    @Input() disabled: boolean;

    constructor(proofOfLowIncomePipe: ProofOfLowIncomePipe) {
        this.proofOfLowIncomePipe = proofOfLowIncomePipe;
    }
}

