import {OrderedMap} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import {StateException} from 'caesium-model/exceptions';
import {FormControl, Validators, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {isBlank} from 'caesium-core/lang';


@Component({
    selector: 'enum-select2',
    template: `
    <div class="form-group"> 
        <label class="control-label" for="enum-select" *ngIf="label">{{label}}</label>
        <select id="enum-select" class="form-control" (blur)="touch.emit($event)" 
                [formControl]="control"
                [ngModel]="value"
                [disabled]="disabled">
            <option *ngFor="let value of enumValues.keySeq().toArray()" [value]="value">
                {{enumValues.get(value)}} 
            </option>
        </select>
    </div>    
    `,
    directives: [
        REACTIVE_FORM_DIRECTIVES
    ],
    styles: [
        require('bootstrap/dist/css/bootstrap.css')
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnumSelect2 {
    @Input() enumValues: OrderedMap<string,string>;

    @Input() value: any;
    @Output() valueChange = new EventEmitter<any>();
    @Output() touch = new EventEmitter<void>();

    @Input() label: string;
    @Input() disabled: boolean = false;
    @Input() required: boolean = false;

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
            this.valueChange.emit(value);
        });
    }

}

