import {List} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    OnInit
} from '@angular/core';

import {Time, TimeInterval, TimeInput} from '../../../utils/time'
import {StaffAvailability} from './availability.model';


@Component({
    selector: 'staff-availability-input',
    template: `
    <style>
    fieldset.main {
        background-color: #e7e7e7;
        width: 80%;
        margin-left: 10%;
    }
    
    fieldset.main > legend {
        padding-left: 2rem;
    }    
        
    table.table > tbody > tr > td, 
    table.table > thead > tr > th {
        max-width: 16%;
        text-align: center;
        vertical-align: middle;
    } 
    </style>
    <fieldset class="main">
    <legend>Availability</legend>
    <table class="table">
        <thead>
            <tr>
                <th></th>
                <th *ngFor="let day of weekDays.toArray()">
                    {{day}} 
                    <input type="checkbox" 
                           [ngModel]="availability.isAvailable(day)"
                           (ngModelChange)="isDayAvailableChanged(day, $event)">
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Start</strong></td>
                <td *ngFor="let day of weekDays.toArray()">
                    <time-input [time]="availability.get(day)?.start"
                                (thimeChange)="isAvailableStartChanged(day, $event)">
                    </time-input>            
                </td>
            </tr> 
            <tr>
                <td><strong>End</strong></td> 
                <td *ngFor="let day of weekDays.toArray()">
                    <time-input [time]="availability.get(day)?.end" 
                                (timeChange)="isAvailableEndChanged(day, $event)">
                    </time-input>
                </td>
            </tr>
        </tbody>
    </table>
    </fieldset>
    `,
    directives: [TimeInput],
    styleUrls: [
        '../../../../assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffAvailabilityInput {
    weekDays = List<string>(['mon', 'tue', 'wed', 'thu', 'fri']);

    @Input() availability: StaffAvailability;
    @Output() availabilityChange = new EventEmitter<StaffAvailability>();

    isDayAvailableChanged(day: string, isAvailable: boolean) {
        var dayInterval: TimeInterval;
        if (isAvailable) {
            dayInterval = new TimeInterval({
                start: new Time({hour: 9}),
                end: new Time({hour: 15})
            });
        } else {
            dayInterval = null;
        }
        this.availabilityChange.emit(
            <StaffAvailability>this.availability.set(day, dayInterval)
        );
    }

    isAvailableStartTimeChanged(day: string, start: Time) {
        var interval = this.availability.get(day)
            .set('start', start);

        this.availabilityChange.emit(
            <StaffAvailability>this.availability.set(day, interval)
        );
    }

    isAvailableEndTimeChanged(day: string, end: Time) {
        var interval = this.availability.get(day)
            .set('end', end);
        this.availabilityChange.emit(
            <StaffAvailability>this.availability.set(day, interval)
        );
    }

}



