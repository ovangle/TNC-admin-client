import moment = require('moment');

import {List} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy,
    ViewChild, ElementRef
} from '@angular/core';

import {isDefined} from 'caesium-core/lang';

import {KeyCode} from '../../keycodes.enum';


const _MONTH_NAMES = List<string>(moment.months());

type InputMode = 'DISPLAY' | 'EDIT';

@Component({
    selector: 'month-input',
    template: `
    <style>
    :host {
        width: 5em; 
        display: block;
    }
    .month-input {
        font-size: inherit;
        font-weight: 600; 
        text-align: end;
        padding: 0;
    }
    input.month-input {
        width: 100%;
        border: 0; 
        outline: none;
    } 
    </style>
    <div [ngSwitch]="mode">
        <div *ngSwitchCase="'EDIT'">
            <input class="month-input"
               [(ngModel)]="_input"
               (keydown)="_handleKeyDown($event)"
               (blur)="commit()"
               #monthInput>
        </div>       
        <div *ngSwitchCase="'DISPLAY'" class="month-input" (click)="edit()">
            {{monthName}} 
        </div>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.Native
})
export class MonthInput {
    @Input() month: number;
    @Output() monthChange = new EventEmitter<number>();

    @ViewChild('monthInput') _monthInput: ElementRef;
    get monthInput(): HTMLInputElement {
        return this._monthInput.nativeElement;
    }

    private mode: InputMode = 'DISPLAY';
    private _input: string;


    get monthName() {
        let name = _MONTH_NAMES.get(this.month);
        console.log('month', this.month, 'month name', name);
        return name;
    }

    ngOnChanges(changes: any) {
        console.log('changed', this.month);
    }

    _handleKeyDown(event: KeyboardEvent) {
        if (event.which === KeyCode.Tab) {
            event.stopImmediatePropagation();
            this.commit();
        } else if (event.which === KeyCode.Enter) {
            event.stopImmediatePropagation();
            this.commit();
        } else if (event.which === KeyCode.Esc) {
            event.stopImmediatePropagation();
            this.cancel();
        }
    }

    edit() {
        this.mode = 'EDIT';
        this._input = this.monthName;
        window.setTimeout(() => {
            this.monthInput.select();
        }, 0);

    }

    commit() {
        var newMonth: number;
        if (this._input.match(/\d{1,2}/)) {
            newMonth = Number.parseInt(this._input);
            newMonth = Math.max(Math.min(newMonth, 12), 1);
            // Changed the 1-indexed month into a 0-indexed month.
            newMonth -= 1;
        } else {
            var lowercaseInput = this._input.toLowerCase();
            newMonth = _MONTH_NAMES.toSeq()
                .map(value => value.toLowerCase())
                .findKey(value => value.startsWith(lowercaseInput));
        }
        if (!Number.isNaN(newMonth)) {
            this.monthChange.emit(newMonth);
        }
        this.mode = 'DISPLAY';
    }

    cancel() {
        this.mode = 'DISPLAY';
    }
}


