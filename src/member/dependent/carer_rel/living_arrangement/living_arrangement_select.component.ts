import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import {EnumSelect} from '../../../../utils/components/enum_select.component';

import {LivingArrangement, LIVING_ARRANGEMENT_VALUES} from './living_arrangement.model';
import {LivingArrangementPipe} from './living_arrangement.pipe';

@Component({
    selector: 'living-arrangement-select',
    template: `
    <enum-select [enumValues]="enumValues"
                 [enumPipe]="enumPipe"
                 [label]="label"
                 [disabled]="disabled"
                 [value]="livingArrangement"
                 (valueChange)="livingArrangementChange.emit($event)">
    </enum-select>
    `,
    directives: [EnumSelect],
    providers: [LivingArrangementPipe],
    styles: [``],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LivingArrangementSelect {
    livingArrangementValues = LIVING_ARRANGEMENT_VALUES;
    livingArrangementPipe: LivingArrangementPipe;

    @Input() livingArrangement: LivingArrangement;
    @Output() livingArrangementChange = new EventEmitter<LivingArrangement>();

    @Input() label: string;
    @Input() disabled: boolean;

    constructor(livingArrangementPipe: LivingArrangementPipe) {
        this.livingArrangementPipe = livingArrangementPipe;
    }
}
