import {Component, EventEmitter, Input, Output} from 'angular2/core';

import {ResidenceType} from './residence_type.enum';
import {ResidenceTypeSelect} from './residence_type_select.component';
import {ResidentialStability} from './residential_stability.enum';
import {ResidentialStabilitySelect} from './residential_stability_select.component';
import {ResidentialStatus} from "./residential_status.record";

@Component({
    selector: 'residential-status-input',
    template: `
        <label for="residential-status">{{label}}</label>
        <fieldset name="residential-status">
            <div class="form-group">
                <residential-stability-select 
                    [label]="'Stability'"
                    [residentialStability]="residentialStatus?.stability"
                    (residentialStabilityChange)="_stabilityChange($event)"
                    [disabled]="disabled">
                </residential-stability-select>
            </div>
            <div class="form-group">
                <residence-type-select 
                    [label]="'Type'"
                    [residenceType]="residentialStatus?.type"
                    (residenceTypeChange)="_typeChange($event)"
                    [disabled]="disabled">
                </residence-type-select>
            </div>
        </fieldset>    
    `,
    directives: [ResidenceTypeSelect, ResidentialStabilitySelect],
    styles: [`
    .form-group {
        margin-left: 2rem;
    }    
    `],
    styleUrls: [
        'assets/css/bootstrap.css'
    ]
})
export class ResidentialStatusInput {
    @Input() residentialStatus: ResidentialStatus;
    @Output() residentialStatusChange = new EventEmitter<ResidentialStatus>();

    @Input() label: string;
    @Input() disabled: boolean = false;


    _typeChange(value: ResidenceType): void {
        this.residentialStatusChange.emit(
            <ResidentialStatus>this.residentialStatus.set('type', value)
        );
    }

    _stabilityChange(value: ResidentialStability): void {
        this.residentialStatusChange.emit(
            <ResidentialStatus>this.residentialStatus.set('stability', value)
        );
    }

}
