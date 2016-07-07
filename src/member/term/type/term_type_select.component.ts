import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {EnumSelect} from '../../../utils/components/enum_select.component';

import {MemberTermType, MEMBER_TERM_TYPE_VALUES} from './term_type.model';
import {MemberTermTypePipe} from './term_type.pipe';

@Component({
    selector: 'member-term-type-select',
    template: `
    <enum-select [id]="'term-type-select'"
                 [enumValues]="termTypeValues"
                 [enumPipe]="termTypePipe"
                 [label]="label"
                 [value]="termType"
                 [required]="required"
                 (valueChange)="termTypeChange.emit($event)"
                 (validityChange)="validityChange.emit($event)"></enum-select>
    `,
    directives: [EnumSelect],
    providers: [MemberTermTypePipe],
    styleUrls: [
       'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class  MemberTermTypeSelect {
    termTypeValues = MEMBER_TERM_TYPE_VALUES;

    @Input() termType: MemberTermType;
    @Output() termTypeChange = new EventEmitter<MemberTermType>();
    @Output() validityChange = new EventEmitter<boolean>();

    @Input() label: string;
    @Input() required: boolean = false;
    @Input() disabled: boolean = false;

    constructor(private termTypePipe: MemberTermTypePipe) { }
}
