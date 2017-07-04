import {OrderedMap} from 'immutable';

import {
    forwardRef,
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import {StateException} from 'caesium-json/exceptions';
import {FormControl, Validators, NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {isBlank} from 'caesium-core/lang';

const enumSelectValueAccessor = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EnumSelect2),
    multi: true
};


@Component({
    selector: 'enum-select2',
    template: `
    <div class="form-group"> 
        <label class="control-label" for="enum-select" *ngIf="label">{{label}}</label>
        <select id="enum-select" class="form-control" (blur)="_onTouched()" 
                [formControl]="control"
                [ngModel]="value"
                [disabled]="disabled">
            <option *ngFor="let value of enumValues.keySeq().toArray()" [value]="value">
                {{enumValues.get(value)}} 
            </option>
        </select>
    </div>    
    `,
    providers: [
        enumSelectValueAccessor
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnumSelect2 implements ControlValueAccessor {
    @Input() enumValues: OrderedMap<string,string>;

    @Input() value: any;
    @Output() valueChange = new EventEmitter<any>();
    @Output() touch = new EventEmitter<void>();

    @Input() label: string;
    @Input() disabled: boolean = false;
    @Input() required: boolean = false;

    private _onChange = (value: any) => {};
    private _onTouched = () => {};

    private control: FormControl;
    constructor() {}

    ngOnInit() {
        if (isBlank(this.enumValues)) {
            throw new StateException(`enum-select: '[enumValues]' must be provided (label: ${this.label})`);

        }
        this.control = new FormControl(this.value,
            this.required ? Validators.required : Validators.nullValidator
        );
        this.control.valueChanges.forEach(value => {
            this._onChange(value);
            this.valueChange.emit(value);
        });
    }

    writeValue(value: any) {
        this.value = value;
    }

    registerOnChange(fn: (_: any) => void) {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => void) {
        this._onTouched = fn;
    }

}

