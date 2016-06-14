import {Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';

import {EnumSelect} from '../../../../utils/components/enum_select.component';

import {CarerRelType, CARER_REL_TYPE_VALUES} from './carer_rel_type.model';
import {CarerRelTypePipe} from './carer_rel_type.pipe';

@Component({
    selector: 'carer-relation-type-select',
    template: `
        <enum-select
            [enumValues]="carerRelTypeValues"
            [enumPipe]="carerRelTypePipe"
            [label]="label"
            [disabled]="disabled"
            [value]="carerRelType"
            (valueChange)="carerRelTypeChange.emit($event)">
        </enum-select>
    `,
    directives: [EnumSelect],
    providers: [CarerRelTypePipe],
    styles: [``],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarerRelTypeSelect {
    carerRelTypeValues = CARER_REL_TYPE_VALUES;
    carerRelTypePipe: CarerRelTypePipe;

    @Input() carerRelType: CarerRelType;
    @Output() carerRelTypeChange = new EventEmitter<CarerRelType>();

    @Input() label: string;
    @Input() disabled: boolean;

    constructor(carerRelTypePipe: CarerRelTypePipe) {
        this.carerRelTypePipe = carerRelTypePipe;
    }
}


