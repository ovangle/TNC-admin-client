import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    PipeTransform
} from '@angular/core'

import {EnumSelect} from '../../../../utils/components/enum_select.component';

import {ResidenceType, RESIDENCE_TYPE_VALUES} from './residence_type.model';
import {ResidenceTypePipe} from './residence_type.pipe';


@Component({
    selector: 'residence-type-select',
    template: `
    <enum-select [enumValues]="residenceTypeValues"
                 [enumPipe]="residenceTypePipe" 
                 [label]="label"
                 [disabled]="disabled"
                 [value]="residenceType"
                 (valueChange)="residenceTypeChange.emit($event)">
    </enum-select>
    `,
    directives: [EnumSelect],
    providers: [ResidenceTypePipe],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResidenceTypeSelect {
    residenceTypeValues = RESIDENCE_TYPE_VALUES;
    residenceTypePipe: ResidenceTypePipe;

    @Input() residenceType: ResidenceType;
    @Output() residenceTypeChange= new EventEmitter<ResidenceType>();

    @Input() label: string;
    @Input() disabled: boolean;

    constructor(residenceTypePipe: ResidenceTypePipe) {
        this.residenceTypePipe = residenceTypePipe;
    }
}
