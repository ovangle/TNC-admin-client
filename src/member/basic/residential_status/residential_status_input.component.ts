import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import {ResidentialStatus} from './residential_status.model';
import {Address} from '../address';

import {RESIDENCE_TYPE_VALUES} from './residence_type.model';
import {RESIDENTIAL_STABILITY_VALUES} from './residential_stability.model';


@Component({
    selector: 'residential-status-input',
    template: `
    <style>
    .input-right {
        margin-left: 30px;
    }
    </style>
    <fieldset>
        <legend>{{label}}</legend>
        
        <address-input *ngIf="address"
                [address]="address"
                (addressChange)="addressChange.emit($event)">
        </address-input>

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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResidentialStatusInput {
    private residenceTypeValues = RESIDENCE_TYPE_VALUES;
    private residentialStabilityValues = RESIDENTIAL_STABILITY_VALUES;

    @Input() address: Address;
    @Output() addressChange = new EventEmitter<Address>();

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
