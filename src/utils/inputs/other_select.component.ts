import {List} from 'immutable';

import {
    Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ViewEncapsulation,
    OnChanges, SimpleChange
} from "@angular/core";

import {StateException} from 'caesium-json/exceptions';
import {isDefined} from 'caesium-core/lang';


export interface OtherSelectOption {
    /**
     * A unique identifier of this option.
     */
    id: number;

    /**
     * The text to display for the option
     */
    displayText: any;

    /**
     * Whether the option should be considered the 'other' value.
     * Only one 'other' value can exist on the other-select.
     */
    isOther: boolean;
}

export interface OtherSelection {
    option: OtherSelectOption;

    otherValue?: string;
}

@Component({
    selector: 'other-select',
    template: `
    <style>
    input.form-control {
        margin-left: 1rem;
    }
    
    input:not(.visible) {
        /* visibility: hidden; */
        display: none; 
    }
    </style>
    <div class="form-group">
        <label>{{label}}</label>
            
        <select name="other-select" class="form-control" 
                [disabled]="disabled"
                [ngModel]="selection.option"
                (ngModelChange)="_selectionChanged($event)">
            <option *ngFor="let option of options" [ngValue]="option">{{option.displayText}}</option>         
        </select>
        <input type="text"  class="form-control" [ngClass]="{'visible': _otherInputVisible}"
                placeholder="Description"
                [disabled]="disabled"
                [ngModel]="selection.otherValue"
                (ngModelChange)="_otherValueChanged($event)">
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtherSelect implements OnChanges {
    @Input() options: List<OtherSelectOption>;

    @Input() selection: OtherSelection;
    @Output() selectionChange = new EventEmitter<OtherSelection>();

    otherOption: OtherSelectOption;

    @Input() disabled: boolean;
    @Input() label: string;

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        if (changes['options']) {
            var options = changes['options'].currentValue as List<OtherSelectOption>;
            var otherOption = options.find((item) => item.isOther);
            if (!isDefined(otherOption)) {
                _throwUniqueOtherOption();
            }
            if (otherOption !== options.findLast(item => item.isOther)) {
                _throwUniqueOtherOption();
            }
            this.otherOption = otherOption;
        }
        if (changes['selection']) {
            console.log('new selection', changes['selection'].currentValue);
        }
    }

    get _otherInputVisible(): boolean {
        if (!isDefined(this.selection))
            return false;
        return this.selection.option.id === this.otherOption.id
    }

    _selectionChanged(value: OtherSelectOption) {
        if (value === this.otherOption) {
            this.selectionChange.emit({
                option: value,
                otherValue: this.selection.otherValue
            });
        } else {
            this.selectionChange.emit({option: value});
        }
    }

    _otherValueChanged(otherValue: string) {
        this.selectionChange.emit({
            option: this.selection.option,
            otherValue: otherValue
        });
    }
}

function _throwUniqueOtherOption() {
    throw new StateException('There must be exactly one other option in the options of an `other-select`');
}
