import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ViewEncapsulation} from "angular2/core";
import {RESIDENTIAL_STABILITY_VALUES, ResidentialStability, ResidentialStabilityPipe} from "./residential_stability.enum";

@Component({
    selector: 'residential-stability-select',
    template: `
    <label for="residential-stability">{{label}}</label>
    <select name="residential-stability" class="form-control"
            [ngModel]="residentialStability" 
            (ngModelChange)="residentialStabilityChange.emit($event)"
            [disabled]="disabled" >
        <option *ngFor="#stability of stabilityValues">{{stability | residentialStability}}</option>
    </select>
    `,
    pipes: [ResidentialStabilityPipe],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResidentialStabilitySelect {
    stabilityValues = RESIDENTIAL_STABILITY_VALUES;

    @Input() residentialStability: ResidentialStability;
    @Output() residentialStabilityChange = new EventEmitter<ResidentialStability>();
    
    @Input() disabled: boolean;
    @Input() label: string;

}
