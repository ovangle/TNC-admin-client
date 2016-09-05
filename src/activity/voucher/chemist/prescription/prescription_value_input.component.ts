

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {ChemistPrescription} from './prescription.model';

@Component({
    selector: 'prescription-value-input',
    template: `
    <h4>{{prescription.name}}</h4>
    
    <div class="checkbox">
        <label>
            <input type="checkbox" 
                [ngModel]="prescription.isPBS"
                (ngModelChange)="isPBSChanged($event)">
            The prescription is listed with the <a href="http://pbs.gov.au">Pharmaceutical Benefits Scheme (PBS)</a>
        </label>
    </div>
    
    <div class="form-control" [ngClass]="{
        'has-error': hasValueError
    }">
        <label for="value-input">Value</label>
        <input id="value-input" type="text" 
               pattern="\\d+\\.?\\d{0,2}" 
               required
               [ngModel]="prescription.value"
               (ngModelChange)="valueChanged($event)"
               #valueInput >
        <div class="help-block" *ngIf="valueInput.errors">
            A value is required 
        </div>
    </div>
    `,
    directives: [],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChemistPrescriptionValueInput {
    @Input() prescription: ChemistPrescription;
    @Output() prescriptionChange = new EventEmitter<ChemistPrescription>();

    private isPBSChanged(value: boolean) {
        this.prescriptionChange.emit(
            <ChemistPrescription>this.prescription.set('isPBS', value)
        );
    }

    private valueChanged(text: string) {
        let val = Number.parseInt(text);
        if (Number.isNaN(val)) {
            return;
        }
        this.prescriptionChange.emit(
            <ChemistPrescription>this.prescription.set('value', val)
        );
    }
}

