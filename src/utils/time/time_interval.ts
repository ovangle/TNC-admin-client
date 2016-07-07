import {Record} from 'immutable';

import {Codec, composeCodecs} from 'caesium-core/codec';
import {recordCodec, JsonObject} from 'caesium-model/json_codecs';

import {Time, timeCodec} from './time';

const _TIME_INTERVAL_RECORD = Record({
    start: null,
    end: null
});

export class TimeInterval extends _TIME_INTERVAL_RECORD {
    start: Time;
    end: Time;
}

const _NULL_AS_WILDCARD: Codec<string,string> = {
    encode: (value: any) => value === null ? '*' : value,
    decode: (value: string) => value === '*' ? null : value
};

/**
 * Encodes a time interval into the format
 *      ((start | timeCodec) || '*') + ' - ' + ((end | timeCodec) || '*')
 *
 * A wildcard character '*' corresponds to a `null` value of the start/end of the interval.
 *
 * @param fmt
 * The format parameter used when encoding times.
 */
export function timeIntervalCodec(fmt: string): Codec<TimeInterval,JsonObject> {
    var _timeCodec = composeCodecs(timeCodec(fmt), _NULL_AS_WILDCARD);
    return recordCodec<TimeInterval>({
        start: _timeCodec,
        end: _timeCodec
    }, (args) => new TimeInterval(args))
}
