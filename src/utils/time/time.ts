import moment = require('moment');
import {Moment} from 'moment';

import {Record} from 'immutable';

import {isBlank} from 'caesium-core/lang';
import {Codec} from 'caesium-core/codec';
import {ArgumentError, EncodingException} from 'caesium-model/exceptions';

const _TIME_RECORD = Record({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
});


export class Time extends _TIME_RECORD {
    hour: number;
    minute: number;
    second: number;
    millisecond: number;

    // Compare the two times. Both are assumed to represent times within the same 24 hour period
    isBefore(other: Time): boolean {
        return this.hour <= other.hour &&
                this.minute <= other.minute &&
                this.second <= other.second &&
                this.millisecond <= other.millisecond;
    }

    isEqual(other: Time): boolean {
        return this.hour === other.hour &&
                this.minute === other.minute &&
                this.second === other.second &&
                this.millisecond === other.millisecond;
    }

    add({hour, minute, second, millisecond}: {hour?: number, minute?: number, second?: number, millisecond?: number}): Time {
        second = this.millisecond + (millisecond || 0) / 1000;
        minute = this.second + (second || 0) / 60;
        hour = this.hour + (minute || 0) / 60;

        if (hour < 0 || hour >= 24) {
            throw new ArgumentError('Cannot add, result is not in same day');
        }

        return <Time>this.withMutations((mutator) => {
            return mutator
                .set('hour', hour)
                .set('minute', minute % 60)
                .set('second', second % 60)
                .set('millisecond', millisecond % 1000);
        });
    }

    subtract({hour, minute, second, millisecond}: {hour?: number, minute?: number, second?: number, millisecond?: number}): Time {
        return this.add({
            hour: -(hour || 0),
            minute: -(minute || 0),
            second: -(second || 0),
            millisecond: -(millisecond || 0)
        })
    }
    
    get isAM(): boolean {
        return this.hour < 12
            || this.hour === 12 && this.minute === 0;
    }

    /**
     * Returns the time as a moment in the current day.
     */
    toMoment(): Moment {
        return moment({hour: this.hour, minute: this.minute, second: this.second, millisecond: this.millisecond});
    }

}

/**
 * Create a codec for the given time.
 *
 * @param fmt
 * Any format as accepted by momentjs
 * http://momentjs.com/docs/#/displaying/format/
 *
 * Note that if the format specifier contains any year, month or day delimiters, these will be dropped
 * during decoding, since they are not present on a [Time] object.
 *
 * @returns {{encode: (function(Time): (any|any))}}
 */
export function timeCodec(fmt: string): Codec<Time, string> {
    return {
        encode: (value: Time) => {
            if (isBlank(value))
                return value as any;
            return value.toMoment().format(fmt);
        },
        decode: (value: string) => {
            if (isBlank(value))
                return value as any;
            var m = moment(value, fmt, true);
            if (!m.isValid())
                throw new EncodingException(`Invalid time for format ${fmt}: ${value}`)
            return new Time({
                hour: m.hour(),
                minute: m.minute(),
                second: m.second(),
                millisecond: m.millisecond()
            });
        }
    }
}

