import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import {EnumSelect2} from '../../../utils/enum';
import {ResidentialStatus} from './residential_status.model';
import {ResidenceType, RESIDENCE_TYPE_VALUES} from './residence_type.model';
import {ResidentialStability, RESIDENTIAL_STABILITY_VALUES} from './residential_stability.model';

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
            
            <enum-select2 class="flex input-right"
                [label]="'Stability'"
                [enumValues]="residentialStabilityValues"
                [value]="residentialStatus.stability"
                (valueChange)="propChanged('stability', $event)"></enum-select2>
        </div>
    </fieldset>
    `,
    directives: [EnumSelect2],
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
    private residentialStabilityValues = RESIDENTIAL_STABILITY_VALUES;

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
