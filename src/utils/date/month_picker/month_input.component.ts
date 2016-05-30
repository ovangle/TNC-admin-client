import moment = require('moment');

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';

import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';

import {List} from 'immutable';

import {
    Component, ElementRef, Input, Output, ChangeDetectionStrategy, EventEmitter, ViewChild, ViewEncapsulation,
    AfterViewInit, OnChanges
} from 'angular2/core';

import {isDefined} from 'caesium-core/lang';

import {KeyCode} from '../../keycodes.enum';

const _MONTH_NAMES = List<string>(moment.months());

//TODO: Validity

@Component({
    selector: 'month-input',
    template: `
        <textarea #input type="text" class="month-input flex"
            rows="1"
            [ngModel]="_partialInput"
            (ngModelChange)="tryComplete($event)"
            (keydown)="_handleEnterOrEsc($event)"
            (focus)="_focus()"
            (blur)="commit()"
        ></textarea><span class="highlight" (mouseup)="_focus()">{{_completion}}</span>
    `,
    styles: [`
        :host {
            width: 5em;
            display: flex;
        }
        textarea.month-input, span.highlight {
            font-weight: 600;
            padding: 0;
        }
        textarea.month-input {
            text-align: right;
            border: 0;
            outline: none;
            resize: none;
        }
        span.highlight {
            background-color: #eee;
        }
    `],
    styleUrls: [
        'assets/css/flex.css',
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthInput implements OnChanges, AfterViewInit {
    @Input() month: number;
    @Output() monthChange = new EventEmitter<number>();

    @ViewChild('input') input: ElementRef;

    private _partialInput: string = '';
    // The current matching month
    private _match: string = '';

    private get _completion(): string {
        return (this._match || '').substr(this._partialInput.length);
    }

    ngAfterViewInit() {
        this._resetValues();
    }


    ngOnChanges(changes: any) {
        if (changes['month'])
            this._resetValues();
    }

    private _resetValues() {
        this._partialInput = _MONTH_NAMES.get(this.month, '');
        this._match = _MONTH_NAMES.get(this.month);
    }

    tryComplete(input: string) {
        this._partialInput = input.trim();
        if (this._partialInput === '' && this._match) {
            // If all we have done is delete the input, keep the current match
            return;
        }
        var lowercaseInput = input.trim().toLowerCase();
        this._match = _MONTH_NAMES.find((value) => value.toLowerCase().startsWith(lowercaseInput));
    }

    private _handleEnterOrEsc(event: KeyboardEvent) {
        if (event.which === KeyCode.Enter) {
            event.stopImmediatePropagation();
            this.commit();
        } else if (event.which === KeyCode.Esc) {
            event.stopImmediatePropagation();
            this.cancel();
        }
    }


    private _focus(event: Event) {
        this._resetValues();
        this._partialInput = '';
        if (document.activeElement !== this.input.nativeElement) {
            setTimeout(() => this.input.nativeElement.focus(), 0);
        }
    }

    cancel() {
        this._resetValues();
    }

    commit() {
        var newMonth: number;

        if (this._partialInput.match(/\d{1,2}/)) {
            // Requires special handling -- the user has input a numeric month.
            newMonth = Number.parseInt(this._partialInput);
        } else if (isDefined(this._match)) {
            newMonth = _MONTH_NAMES.indexOf(this._match);
        }
        this.month = newMonth;
        this.monthChange.emit(this.month);
        this._resetValues();
    }

}

