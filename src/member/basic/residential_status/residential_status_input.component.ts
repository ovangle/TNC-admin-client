import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import {ResidentialStatus} from './residential_status.model';
import {ResidenceType, ResidenceTypeSelect} from './type';
import {ResidentialStability, ResidentialStabilitySelect} from './stability';

@Component({
    selector: 'residential-status-input',
    template: `
    <fieldset>
        <legend>{{label}}</legend>
        
        <residence-type-select
            [label]="'Type'"
            [disabled]="disabled"
            [residenceType]="residentialStatus.type"
            (residenceTypeChange)="_typeChanged($event)">
        </residence-type-select>
        
        <residential-stability-select
            [label]="'Stability'"
            [disabled]="disabled"
            [residentialStability]="residentialStatus.stability"
            (residentialStabilityChange)="_stabilityChanged($event)">
        </residential-stability-select>
    </fieldset>
    `,
    directives: [ResidenceTypeSelect, ResidentialStabilitySelect],
    styles: [``],
    styleUrls: [
        'assets/css/flex.css',
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResidentialStatusInput {
    @Input() residentialStatus: ResidentialStatus;
    @Output() residentialStatusChange = new EventEmitter<ResidentialStatus>();

    @Input() label: string;
    @Input() disabled: boolean;

    _typeChanged(type: ResidenceType) {
        this.residentialStatusChange.emit(
            <ResidentialStatus>(this.residentialStatus.set('type', type))
        );
    }

    _stabilityChanged(stability: ResidentialStability) {
        this.residentialStatusChange.emit(
            <ResidentialStatus>(this.residentialStatus.set('stability', stability))
        );
    }
}
