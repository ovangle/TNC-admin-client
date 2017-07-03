
import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges
} from '@angular/core';

import {Time} from '../time';

@Component({
    selector: 'time-input',
    templateUrl: './time_input.component.html',
    styleUrls: [
        './time_input.component.css'
    ],
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
