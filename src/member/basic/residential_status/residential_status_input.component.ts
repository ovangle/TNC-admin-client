import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import {EnumSelect2} from '../../../utils/enum';
import {ResidentialStatus} from './residential_status.model';
import {ResidenceType, RESIDENCE_TYPE_VALUES} from './residence_type.model';
import {ResidentialStability, ResidentialStabilitySelect} from './stability';

@Component({
    selector: 'residential-status-input',
    template: `
    <fieldset>
        <legend>{{label}}</legend>
        
        <div class="layout horizontal">
            <enum-select2 class="flex"
                [label]="'Type'"
                [enumValues]="residenceTypeValues"
                [value]="residentialStatus.type"
                (valueChange)="propChanged('type', $event)">
            </enum-select2>
            
            <residential-stability-select
                class="flex input-right"
                [label]="'Stability'"
                [disabled]="disabled"
                [residentialStability]="residentialStatus.stability"
                (residentialStabilityChange)="propChanged('stability', $event)">
            </residential-stability-select>
        </div>
    </fieldset>
    `,
    directives: [EnumSelect2, ResidentialStabilitySelect],
    styles: [`
    .input-right {
        margin-left: 30px;
    }
    `],
    styleUrls: [
        'assets/css/flex.css',
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResidentialStatusInput {
    private residenceTypeValues = RESIDENCE_TYPE_VALUES;

    @Input() residentialStatus: ResidentialStatus;
    @Output() residentialStatusChange = new EventEmitter<ResidentialStatus>();

    @Input() label: string;
    @Input() disabled: boolean;

    private propChanged(prop: string, value: any) {
        this.residentialStatusChange.emit(
            <ResidentialStatus>(this.residentialStatus.set(prop, value))
        );
    }
}
