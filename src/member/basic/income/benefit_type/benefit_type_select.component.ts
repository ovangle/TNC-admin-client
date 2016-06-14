import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    PipeTransform
} from '@angular/core'

import {EnumSelect} from '../../../../utils/components/enum_select.component';

import {BenefitType, BENEFIT_TYPE_VALUES} from './benefit_type.model';
import {BenefitTypePipe} from './benefit_type.pipe';

@Component({
    selector: 'benefit-type-select',
    template: `
    <enum-select [enumValues]="benefitTypeValues"
                 [enumPipe]="benefitTypePipe" 
                 [label]="label"
                 [disabled]="disabled"
                 [value]="benefitType"
                 (valueChange)="benefitTypeChange.emit($event)">
    </enum-select>
    `,
    directives: [EnumSelect],
    providers: [BenefitTypePipe],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BenefitTypeSelect {
    benefitTypeValues = BENEFIT_TYPE_VALUES;
    benefitTypePipe: PipeTransform;

    @Input() benefitType: BenefitType;
    @Output() benefitTypeChange = new EventEmitter<BenefitType>();

    @Input() label: string;
    @Input() disabled: boolean;

    constructor(benefitTypePipe: BenefitTypePipe) {
        this.benefitTypePipe = benefitTypePipe;
    }
}
