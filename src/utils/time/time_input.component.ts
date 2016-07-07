
import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    OnChanges, ViewChild
} from '@angular/core';

import {Time} from './time';

@Component({
    selector: 'time-input',
    template: `
    <div class="form-group time-container">
        <label>{{label}}</label>
        <div class="form-control time-container layout horizontal" 
             [ngClass]="{ 'focus': timeContainerFocus}"
             [attr.disabled]="time === null ? true : null">
            <div class="layout horizontal">
                <input type="number" class="input-section input-hour flex" 
                       [disabled]="time === null"
                       [ngModel]="_hour" 
                       (ngModelChange)="hourChanged($event)"
                       (focus)="_hourInputFocus = true"
                       (blur)="_hourInputFocus = false">
                   
                <span class="input-separator">:</span>
            
                <input #minuteInput
                        type="number" class="input-section input-minute flex"
                        [disabled]="time === null"
                        [ngModel]="_minute" 
                        (ngModelChange)="minuteChanged($event)"
                        (focus)="_minuteInputFocus = true"
                        (blur)="_minuteInputFocus = false">
            </div>       
                   
            <select class="period-select"
                    [disabled]="time === null"
                    [ngModel]="_isAM" 
                    (ngModelChange)="isAMChanged($event)"
                    (focus)="_periodSelectFocus = true"
                    (blur)="_periodSelectFocus = false">
                <option [value]="true">AM</option>
                <option [value]="false">PM</option>
            </select>
        </div>
    </div>
    `,
    directives: [],
    styles: [`
    .input-section {
        border: 0;
        flex-shrink: 1;
        width: 30%;
        min-width: 2em;
        background-color: transparent;
        cursor: inherit;
    }
     
    .input-hour {
        text-align: right; 
    }    
    
    span.separator {
        padding-left: 0.1rem;
        padding-right: 0.1rem;
    }    
     
    div.time-container {
        padding-right: 0;
    } 
    div.time-container.focus {
        border-color: #66afe9;
        outline: 0;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
    }
    
    select.period-select {
        background-color: transparent;
        border: 0;
        padding-left: 0;
        min-width: 3em;
        max-width: 4em;
        border-left: 0;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        -webkit-appearance: none;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDZFNDEwNjlGNzFEMTFFMkJEQ0VDRTM1N0RCMzMyMkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDZFNDEwNkFGNzFEMTFFMkJEQ0VDRTM1N0RCMzMyMkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NkU0MTA2N0Y3MUQxMUUyQkRDRUNFMzU3REIzMzIyQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NkU0MTA2OEY3MUQxMUUyQkRDRUNFMzU3REIzMzIyQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuGsgwQAAAA5SURBVHjaYvz//z8DOYCJgUxAf42MQIzTk0D/M+KzkRGPoQSdykiKJrBGpOhgJFYTWNEIiEeAAAMAzNENEOH+do8AAAAASUVORK5CYII=);
        background-position: right 50%;
        background-repeat: no-repeat; 
        cursor: inherit;
    } 
    
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }    
     
        
    `],
    styleUrls: [
        'assets/css/flex.css',
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeInput implements OnChanges {
    @Input() time: Time;
    @Output() timeChange = new EventEmitter<Time>();

    private _isAM: boolean;
    private _hourInputFocus: boolean = false;
    private _minuteInputFocus: boolean = false;
    private _periodSelectFocus: boolean = false;

    @Input() label: string;

    get _hour() {
        if (!this.time) {
            return null;
        }
        if (this.time.hour > 12)
            return `${this.time.hour - 12}`;
        return `${this.time.hour}`;
    }

    get _minute() {
        if (!this.time)
            return null;
        if (this.time.minute < 10) {
            return `0${this.time.minute}`;
        }
        return `${this.time.minute}`
    }

    hourChanged(hour: number) {
        if (hour < 0 || hour >= 12) {
            return this.timeChange.emit(this.time);
        }
        if (!this._isAM) {
            hour = hour + 12;
        }
        this.timeChange.emit(
            <Time>this.time.set('hour', hour)
        );
    }

    minuteChanged(minute: number) {
        if (minute < 0 || minute >= 60) {
            return this.timeChange.emit(this.time);
        }
        
        this.timeChange.emit(
            <Time>this.time.set('minute', minute)
        );
    }

    isAMChanged(isAM: boolean) {
        this._isAM = isAM;
    }

    ngOnChanges() {
        this._isAM = this.time && this.time.isAM;
    }

    get timeContainerFocus(): boolean {
        return this._hourInputFocus
            || this._minuteInputFocus
            || this._periodSelectFocus;
    }



}
