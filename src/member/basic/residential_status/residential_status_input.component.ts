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
        
        <div class="layout horizontal">
            <residence-type-select
                class="flex"
                [label]="'Type'"
                [disabled]="disabled"
                [residenceType]="residentialStatus.type"
                (residenceTypeChange)="propChanged('type', $event)">
            </residence-type-select>
            
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
    directives: [ResidenceTypeSelect, ResidentialStabilitySelect],
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
