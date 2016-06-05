import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    PipeTransform
} from '@angular/core'

import {EnumSelect} from '../../../../utils/components/enum_select.component';

import {IncomeType, INCOME_TYPE_VALUES} from './income_type.model';
import {IncomeTypePipe} from './income_type.pipe';

@Component({
    selector: 'income-type-select',
    template: `
    <enum-select [enumValues]="incomeTypeValues"
                 [enumPipe]="incomeTypePipe" 
                 [label]="label"
                 [disabled]="disabled"
                 [value]="incomeType"
                 (valueChange)="incomeTypeChange.emit($event)">
    </enum-select>
    `,
    directives: [EnumSelect],
    providers: [IncomeTypePipe],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncomeTypeSelect {
    incomeTypeValues = INCOME_TYPE_VALUES;
    incomeTypePipe: PipeTransform;

    @Input() incomeType: IncomeType;
    @Output() incomeTypeChange = new EventEmitter<IncomeType>();

    @Input() label: string;
    @Input() disabled: boolean;

    constructor(incomeTypePipe: IncomeTypePipe) {
        this.incomeTypePipe = incomeTypePipe;
    }
}
