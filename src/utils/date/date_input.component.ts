import moment = require('moment');
import {Moment} from 'moment';


import {Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {isBlank} from 'caesium-core/lang';

import {Dropdown} from '../../layout/dropdown.component';
import {DatePicker} from "./month_picker/date_picker.component";

const _DATE_FORMAT_STRING = 'dd/mm/yyyy';

@Component({
    selector: 'date-input',
    template: `
    <label for="date-input">{{label}}</label>
    <div class="input-group">
        <input name="date-input" type="text" class="form-control" 
            [placeholder]="_fullPlaceholder"
            [ngModel]="_moment?.format('DD/MM/YYYY')"
            (focus)="highlightInput($event)"
            (blur)="tryParseDate($event)"
            [disabled]="disabled">
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
    `,
    directives: [DatePicker, Dropdown],
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
    private _moment: Moment;

    @Input() label: string;

    @Input() placeholder: string;
    @Input() disabled: boolean;

    @Input()
    get date() { return isBlank(this._moment) ? null : this._moment.toDate(); }
    set date(value: Date) {
        if (!isBlank(value)) {
            this._moment = moment(value);
        }
    }

    @Output() dateChange = new EventEmitter<Date>();

    ngOnInit() {
        if (isBlank(this.date))
            this.date = new Date();
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

    tryParseDate(event: Event) {
        var value = (event.target as HTMLInputElement).value;
        var match = value.match(/^\d{1,2}\/\d{1,2}\/\d{2,4}$/);
        if (match) {
            var m = moment(value, 'DD/MM/YYYY');
            if (m.isValid()) {
                this._moment = m;
            }
        }
    }

    pickerDateChange(date: Date) {
        this.date = date;
        this.dateChange.emit(date);
        this._dropdownActive = false;
    }

    suppress(event: Event) {
        // Suppress the event so that it doesn't propagate to the document.
        // Use this to catch mousedown events from the button which displays the picker
        event.stopPropagation();
        event.preventDefault();
    }
}
