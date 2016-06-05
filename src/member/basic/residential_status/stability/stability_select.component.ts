import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    PipeTransform
} from '@angular/core'

import {EnumSelect} from '../../../../utils/components/enum_select.component';

import {ResidentialStability, RESIDENTIAL_STABILITY_VALUES} from './stability.model';
import {ResidentialStabilityPipe} from './stability.pipe';


@Component({
    selector: 'residential-stability-select',
    template: `
    <enum-select [enumValues]="residentialStabilityValues"
                 [enumPipe]="residentialStabilityPipe" 
                 [label]="label"
                 [disabled]="disabled"
                 [value]="residentialStability"
                 (valueChange)="residentialStabilityChange.emit($event)">
    </enum-select>
    `,
    directives: [EnumSelect],
    providers: [ResidentialStabilityPipe],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResidentialStabilitySelect {
    residentialStabilityValues = RESIDENTIAL_STABILITY_VALUES;
    residentialStabilityPipe: ResidentialStabilityPipe;

    @Input() residentialStability: ResidentialStability;
    @Output() residentialStabilityChange = new EventEmitter<ResidentialStability>();

    @Input() label: string;
    @Input() disabled: boolean;

    constructor(residentialStabilityPipe: ResidentialStabilityPipe) {
        this.residentialStabilityPipe = residentialStabilityPipe;
    }
}
