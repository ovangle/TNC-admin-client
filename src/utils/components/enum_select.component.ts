import {List} from 'immutable';
import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    PipeTransform
} from '@angular/core'

import {FormControl, REACTIVE_FORM_DIRECTIVES, Validators, ValidatorFn} from '@angular/forms';

@Component({
    selector: 'enum-select',
    template: `
    <div class="form-group">
        <label class="control-label" for="enum-select">{{label}}</label>
        <select id="enum-select" class="form-control"
                [disabled]="disabled"
                [formControl]="control">
            <option *ngFor="let value of enumValues.toArray()" [ngValue]="value">
                {{enumPipe.transform(value)}}
            </option>
        </select> 
        <span class="help-block" *ngIf="control.touched && control.errors?.required">
            A value is required 
        </span> 
    </div>
    `,
    directives: [REACTIVE_FORM_DIRECTIVES],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnumSelect {
    @Input() enumValues: List<any>;
    @Input() enumPipe: PipeTransform;

    @Input() value: any;
    @Output() valueChange = new EventEmitter<any>();
    @Output() validityChange = new EventEmitter<boolean>();

    @Input() label: string;
    @Input() required: boolean = false;
    @Input() disabled: boolean = false;

    private control: FormControl;

    errorText: string;

    ngOnInit() {
        var validators: ValidatorFn[] = [];
        if (this.required) {
            validators.push(Validators.required);
        }
        this.control = new FormControl(this.value, validators);
        this.control.valueChanges.forEach((value) => {
            this.valueChange.emit(value);
            this.validityChange.emit(this.control.valid);
        });
    }
}
