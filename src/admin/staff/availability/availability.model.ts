import {Record} from 'immutable';

import {Codec} from 'caesium-core/codec';
import {JsonObject, recordCodec} from 'caesium-model/json_codecs';

import {TimeInterval, timeIntervalCodec} from '../../../utils/time/time_interval';


const _STAFF_AVAILABILITY_RECORD = Record({
    mon: null,
    tue: null,
    wed: null,
    thu: null,
    fri: null
});

export class StaffAvailability extends _STAFF_AVAILABILITY_RECORD {
    mon: TimeInterval;
    tue: TimeInterval;
    wed: TimeInterval;
    thu: TimeInterval;
    fri: TimeInterval;
    
    isAvailable(day: string) {
        return this.get(day) !== null;
    }
}


export const STAFF_AVAILABILITY_CODEC: Codec<StaffAvailability, JsonObject> = (() => {
    var intervalCodec = timeIntervalCodec('HH:mm');
    return recordCodec<StaffAvailability>({
        mon: intervalCodec,
        tue: intervalCodec,
        wed: intervalCodec,
        thu: intervalCodec,
        fri: intervalCodec
    }, (args) => new StaffAvailability(args));
})();


