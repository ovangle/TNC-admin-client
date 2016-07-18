import moment = require('moment');
import {Moment} from 'moment';

import {Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {FormControl, REACTIVE_FORM_DIRECTIVES, Validators} from '@angular/forms';

import {isBlank, isDefined} from 'caesium-core/lang';

import {Dropdown} from '../layout/dropdown.component';
import {DatePicker} from "./month_picker/date_picker.component";

const _DATE_FORMAT_STRING = 'dd/mm/yyyy';

@Component({
    selector: 'date-input',
    template: `
    <div class="form-group"
         [ngClass]="{
            'has-error': control.touched && !control.valid
         }">
        <label class="control-label" for="date-input">{{label}}</label>
        <div class="input-group">
            <input name="date-input" type="text" class="form-control"
                [placeholder]="_fullPlaceholder"
                [formControl]="control"
            >
            <div class="input-group-btn">
                <button class="btn btn-default"
                        (mousedown)="suppress($event)"
                        (click)="togglePicker()"
                        [disabled]="disabled">
                    <i class="fa fa-calendar"></i>
                </button>
            </div>
        </div>
        <dropdown [active]="_dropdownActive"
                  [alignRight]="true"
                  (closeRequest)="_dropdownActive = false">
            <date-picker [date]="_moment"
                         (dateChange)="pickerDateChange($event)">
            </date-picker> 
        </dropdown>    
        <span class="help-block" *ngIf="control.touched && control.errors?.invalidDate">
            Invalid date 
        </span>
        <span class="help-block" *ngIf="control.touched && control.errors?.required">
            A value is required 
        </span>
    </div>
    `,
    directives: [DatePicker, Dropdown, REACTIVE_FORM_DIRECTIVES],
    styles: [`
        :host { display: block; }    
    `],
    styleUrls: [
        'assets/css/bootstrap.css',
        'assets/css/font-awesome.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateInput implements OnInit {
    private _dropdownActive = false;
    private get _moment(): Moment {
        return tryParseDate(this.control.value);
    }

    @Input() label: string;
    @Input() required: boolean;

    @Input() defaultToday: boolean = true;

    @Input() placeholder: string;
    @Input() disabled: boolean;

    @Input() date: Date;

    @Output() dateChange = new EventEmitter<Date>();
    @Output() validityChange = new EventEmitter<boolean>();

    private control: FormControl;

    ngOnInit() {
        var validators = <any[]>[dateValidator];
        if (this.required) {
            validators.push(Validators.required);
        }

        this.control = new FormControl(formatDate(this.date), validators);
        this.control.valueChanges.forEach((date: string) => {
            if (this.control.valid) {
                this.dateChange.emit(tryParseDate(this.control.value).toDate());
            }
            this.validityChange.emit(this.control.valid);

        });
        if (this.defaultToday && isBlank(this.date)) {
            var date = moment().format('DD/MM/YYYY');
            this.control.updateValue(date, {emitEvent: true});
        }
    }

    ngOnChanges(changes: any) {
        if (isDefined(this.control) && changes.date) {
            this.control.updateValue(formatDate(this.date));
        }
    }

    get _fullPlaceholder(): string {
        if (!isBlank(this.placeholder)) {
            return `${this.placeholder} (${_DATE_FORMAT_STRING})`;
        }
        return _DATE_FORMAT_STRING;
    }

    togglePicker(event: MouseEvent) {
        this._dropdownActive = !this._dropdownActive;
    }

    highlightInput(event: Event) {
        var input = event.target as HTMLInputElement;
        input.setSelectionRange(0, input.value.length);
    }

    pickerDateChange(date: Date) {
        var m = moment(date);
        this.control.updateValue(m.format('DD/MM/YYYY'), {emitEvent: true});
        this._dropdownActive = false;
    }

    suppress(event: Event) {
        // Suppress the event so that it doesn't propagate to the document.
        // Use this to catch mousedown events from the button which displays the picker
        event.stopPropagation();
        event.preventDefault();
    }
}

function tryParseDate(value: string): Moment {
    if (isBlank(value) || value === '') {
        return null;
    }
    var m = moment(value, 'DD/MM/YYYY', true);
    return m;
}

function dateValidator(control: FormControl): {[key: string]: any} {
    var date = tryParseDate(control.value);
    if (date !== null && !date.isValid()) {
        return {
            invalidDate: true
        }
    }
    return null;
}

function formatDate(date: Date) {
    if (isBlank(date))
        return '';
    var m = moment(date);
    return m.format('DD/MM/YYYY');
}
