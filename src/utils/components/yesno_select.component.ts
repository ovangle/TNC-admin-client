import {Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';

import {isBlank} from 'caesium-core/lang';

@Component({
    selector: 'yesno-select',
    template: `
    <div class="form-group">
        <label for="yesno-select">{{label}}</label>
        <select name="yesno-select" 
                class="form-control" 
                [ngModel]="_coerceValue" 
                (ngModelChange)="_valueChanged($event)"
                [disabled]="disabled">
            <option [ngValue]="true">Yes</option>
            <option [ngValue]="false">No</option>
            <option *ngIf="allowNull" [ngValue]="_NULL_VALUE">Not Disclosed</option> 
        </select>      
    </div>    
    `,
    styleUrls: ['assets/css/bootstrap.css'],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YesNoSelect {
    _NULL_VALUE = {};

    @Input() allowNull: boolean = true;
    @Input() value: boolean;
    @Output() valueChange = new EventEmitter<boolean>();

    @Input() label: string;
    @Input() disabled: boolean;

    private get _coerceValue() {
        return isBlank(this.value) ? this._NULL_VALUE : this.value;
    }

    _valueChanged(value: any) {
        this.valueChange.emit(value === this._NULL_VALUE? null : value);
    }
}
