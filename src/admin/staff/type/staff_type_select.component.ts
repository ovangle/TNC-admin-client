import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import {EnumSelect} from "../../../utils/components/enum_select.component";

import {StaffType, STAFF_TYPE_VALUES} from './staff_type.model';
import {StaffTypePipe} from './staff_type.pipe';

@Component({
    selector: 'staff-type-select',
    template: `
    <enum-select
        [label]="label"
        [disabled]="disabled"
        [enumValues]="staffTypeValues"
        [enumPipe]="_staffTypePipe"
        [value]="staffType"
        (valueChange)="staffTypeChange.emit($event)">
    </enum-select>
    `,
    directives: [EnumSelect],
    providers: [StaffTypePipe],
    styleUrls: [
       'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffTypeSelect {
    staffTypeValues = STAFF_TYPE_VALUES;
    
    @Input() label: string;

    @Input() staffType: StaffType;
    @Output() staffTypeChange = new EventEmitter<StaffType>();

    constructor(private _staffTypePipe: StaffTypePipe) {}
}
