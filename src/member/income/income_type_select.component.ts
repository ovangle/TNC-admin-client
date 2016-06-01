import {Component, Input, Output, ChangeDetectionStrategy, ViewEncapsulation, EventEmitter} from '@angular/core';
import {IncomeType, IncomeTypePipe, INCOME_TYPE_VALUES} from "./income_type.enum";

@Component({
    selector: 'income-type-select',
    template: `
        <div class="form-group">
            <label for="income-type">{{label}}</label>
            <select name="income-type" class="form-control" 
                [ngModel]="incomeType" 
                [ngModel]="incomeTypeChange.emit($event)"
                [disabled]="disabled">
                <option *ngFor="#value of incomeTypeValues">{{value | incomeType}}</option>
            </select>    
        </div>
    `,
    pipes: [IncomeTypePipe],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncomeTypeSelect {
    incomeTypeValues = INCOME_TYPE_VALUES; 
    
    @Input() incomeType: IncomeType;
    @Output() incomeTypeChange = new EventEmitter<IncomeType>();

    @Input() label: string;
    @Input() disabled: boolean;
}
