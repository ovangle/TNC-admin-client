import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    PipeTransform
} from '@angular/core'

import {EnumSelect} from '../../../utils/components/enum_select.component';

import {Gender, GENDER_VALUES} from './gender.model';
import {GenderPipe} from './gender.pipe';


@Component({
    selector: 'gender-select',
    template: `
    <enum-select [enumValues]="genderValues"
                 [enumPipe]="genderPipe" 
                 [label]="label"
                 [disabled]="disabled"
                 [value]="gender"
                 (valueChange)="genderChange.emit($event)">
    </enum-select>
    `,
    directives: [EnumSelect],
    providers: [GenderPipe],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenderSelect {
    genderValues = GENDER_VALUES;
    genderPipe: PipeTransform;

    @Input() gender: Gender;
    @Output() genderChange = new EventEmitter<Gender>();

    @Input() label: string;
    @Input() disabled: boolean;

    constructor(genderPipe: GenderPipe) {
        this.genderPipe = genderPipe;
    }
}
