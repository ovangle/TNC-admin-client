import moment = require('moment');
import {List} from 'immutable';
import {Moment} from 'moment';

import {Component, EventEmitter, Input, Output, ViewEncapsulation, ChangeDetectionStrategy} from "@angular/core";


@Component({
    selector: 'calendar-month',
    template: `
    <style>
        :host {
            display: block;
            width: 100%; 
        }
        table {
            width: 100%;
            cursor: pointer;
        }    
        
        table > thead > tr > th, 
        table > tbody > tr > td {
            width: 2em;
            text-align: center;
        }
        
        table > tbody > tr > td {
            padding-bottom: 10.5%;
            position: relative;
        }    
        
        table > thead > tr > th {
            font-weight: 100;
            color: #555;
        }
        
        .day-cell {
            position: absolute;
            left: 4px; right: 4px;
            top: 0; bottom: 0;
            border-radius: 50%;
            text-align: inherit;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .day-cell.selected {
            background-color: #337ab7;
            color: white;
        }     
    </style>
    <table>
        <thead>
            <tr>
                <th *ngFor="let dayName of dayNames">{{dayName}}</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let week of monthWeeks">
                <td *ngFor="let day of week"
                    (click)="selectDay(day)">
                    <div class="day-cell" [ngClass]="{'selected': isSelected(day)}">{{inMonth(day) ? day.date: '' }}</div>
                </td>
            </tr>
        </tbody>
    </table>    
    `,
    styles: [
        require('bootstrap/dist/css/bootstrap.css')
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarMonth {
    private dayNames = List<string>(moment.weekdaysMin());

    // The year and month that are displayed on the calendar
    @Input() year: number;
    @Input() month: number;

    /// The day that is selected.
    @Input() selectedDate: Moment;
    @Output() selectedDateChange = new EventEmitter<Moment>();

    private get monthWeeks(): DayCell[][] {
        var weeks = [] as DayCell[][];
        var day = moment({year: this.year, month: this.month});
        day.startOf('week');
        for (let i=0;i<6;i++) {
            var week = [] as DayCell[];
            for (let i=0;i<7;i++) {
                week.push({month: day.month(), date: day.date()});
                day.add(1, 'day');
            }
            weeks.push(week);
        }
        return weeks;
    }

    private inMonth(dayCell: DayCell): boolean {
        return dayCell.month === this.month;
    }

    isSelected(day: DayCell): boolean {
        return this.inMonth(day)
            && this.selectedDate.year() === this.year
            && this.selectedDate.month() === this.month
            && this.selectedDate.date() === day.date;
    }

    selectDay(day: DayCell) {
        if (!this.inMonth(day)) {
            // Clicking on a day that is not in this month does nothing
            return;
        }
        this.selectedDate = moment({year: this.year, month: this.month, date: day.date});
        this.selectedDateChange.emit(this.selectedDate);
    }
}

interface DayCell {
    month: number;
    date: number;
}
