
import {Component, EventEmitter, Input, Output, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {ResidenceType, ResidenceTypePipe, RESIDENCE_TYPE_VALUES} from './residence_type.enum';

@Component({
    selector: 'residence-type-select',
    template: `
        <label for="residence-type">{{label}}</label>
        <select name="residence-type" class="form-control" 
                [ngModel]="residenceType"
                (ngModelChange)="residenceTypeChange.emit($event)"
                [disabled]="disabled">
            <option *ngFor="let value of residenceTypeValues" [value]="value">{{value | residenceType}}</option>
        </select>        
        
    `,
    pipes: [ResidenceTypePipe],
    styleUrls: ['assets/css/bootstrap.css'],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResidenceTypeSelect {
    residenceTypeValues = RESIDENCE_TYPE_VALUES;

    @Input() residenceType: ResidenceType;
    @Output() residenceTypeChange = new EventEmitter<ResidenceType>();

    @Input() label: string;
    @Input() disabled: boolean;
}
