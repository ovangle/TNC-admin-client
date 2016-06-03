import {Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';

import {CarerRelType, CARER_REL_TYPE_VALUES} from './carer_rel_type.model';
import {CarerRelTypePipe} from './carer_rel_type.pipe';

@Component({
    selector: 'carer-relation-type-select',
    template: `
        <div class="form-group">
            <label for="select">{{label}}</label> 
            <select name="select" class="form-control"
                    [disabled]="disabled"
                    [ngModel]="carerRelType"
                    (ngModelChange)="carerRelTypeChange.emit($event)">
                <option *ngFor="let relType of carerRelTypeValues">{{relType | carerRelType}}</option>         
            </select>
        </div>
    `,
    pipes: [CarerRelTypePipe],
    styles: [``],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarerRelationTypeSelect {
    carerRelTypeValues = CARER_REL_TYPE_VALUES; 
    
    @Input() carerRelType: CarerRelType;
    @Output() carerRelTypeChange = new EventEmitter<CarerRelType>();
    
    @Input() label: string;
    @Input() disabled: boolean;
}


