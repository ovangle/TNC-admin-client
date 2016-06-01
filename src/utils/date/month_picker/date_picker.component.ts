import moment = require('moment');
import {Moment} from 'moment';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';


import {
    Component, EventEmitter, Input, ViewEncapsulation, ChangeDetectionStrategy, Output,
    OnInit, OnDestroy, ElementRef
} from "@angular/core";


import {CalendarMonth} from './calendar_month.component';
import {CurrentDateDisplay} from './current_date_display.component';
import {MonthInput} from './month_input.component';
import {YearInput} from './year_input.component';

@Component({
    selector: 'date-picker',
    template: `
    <current-date-display [date]="_selected"></current-date-display>
    <div class="calendar-container">
        <header class="layout horizontal">
            <i class="fa fa-chevron-left" (click)="_decrementDisplayMonth()"></i>
            <month-input class="flex-1" [month]="_displayMoment.month()" (monthChange)="_setDisplayMonth($event)"></month-input>     
            <year-input class="flex-1" [year]="_displayMoment.year()" (yearChange)="_setDisplayYear($event)"></year-input>
            <i class="fa fa-chevron-right" (click)="_incrementDisplayMonth()"></i> 
        </header>    
        <main>
            <calendar-month 
                [year]="_displayMoment.year()"
                [month]="_displayMoment.month()"
                [selectedDate]="_selected"
                (selectedDateChange)="_selected = $event"></calendar-month>
                
            <div class="btn-group">
                <button class="btn btn-primary" (click)="commit()">OK</button>    
                <button class="btn btn-default" (click)="cancel()">Cancel</button>
            </div>
        </main>
    </div>
    `,
    styles: [`
    :host {
        display: flex; 
        background-color: #fff;
    }
    
    .calendar-container {
        width: 25rem; 
        padding: 1rem;
    }
    
    header, main {
        width: 100%;
    }
    
    header {
        margin-bottom: 2rem;
    }
    
    .btn-group {
        float: right;
    }
    
    month-input:after {
        width: 1rem;  
        content: '';
    }
    
    i.fa {
        line-height: inherit;
    }
    `],
    styleUrls: [
        'assets/css/bootstrap.css',
        'assets/css/font-awesome.css',
        'assets/css/flex.css'
    ],
    directives: [CurrentDateDisplay, MonthInput, YearInput, CalendarMonth],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePicker implements OnInit, OnDestroy {
    private _displayMoment: Moment = moment();

    private _selected: Moment = moment();

    private _element: ElementRef;
    private _closeSubscriptions = Immutable.List<Subscription>();

    @Input()
    get date(): Date { return this._selected.toDate(); }
    set date(value: Date) {
        this._selected = moment(value);
        this._displayMoment = this._selected.clone();
    }

    @Output() dateChange = new EventEmitter<Date>();


    constructor(elementRef: ElementRef) {
        this._element = elementRef;
    }
    ngOnInit() {
        var enterKeyPress = Observable.fromEvent(document, 'keypress')
            .filter((event:KeyboardEvent) => event.which === 13 /* enter */)
            .subscribe((event) => this.commit());

        this._closeSubscriptions = this._closeSubscriptions.push(
            enterKeyPress
        );
    }

    ngOnDestroy() {
        this._closeSubscriptions
            .filter((subscriber) => !subscriber.isUnsubscribed)
            .forEach((subscriber) => subscriber.unsubscribe());

    }

    _decrementDisplayMonth() {
        this._displayMoment = this._displayMoment.clone().subtract(1, 'month');
    }

    _incrementDisplayMonth() {
        this._displayMoment = this._displayMoment.clone().add(1, 'month');
    }

    _setDisplayMonth(month: number) {
        this._displayMoment = this._displayMoment.clone().month(month);
    }

    _setDisplayYear(year: number) {
        this._displayMoment = this._displayMoment.clone().year(year);
    }

    commit() {
        this.date = this._selected.toDate();
        this.dateChange.emit(this.date);
    }

    cancel() {
        this.dateChange.emit(this.date);
    }
}

