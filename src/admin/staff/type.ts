import {OrderedMap} from 'immutable';
import {str} from 'caesium-json/json_codecs';

export type StaffType = 'PERMANENT_STAFF'
     | 'OFFICE_VOLUNTEER'
     | 'FOODCARE_VOLUNTEER'
     | 'OTHER_VOLUNTEER';

export const STAFF_TYPE_VALUES = OrderedMap<StaffType, string>([
    ['PERMANENT_STAFF', 'Permanent staff'],
    ['OFFICE_VOLUNTEER', 'Office volunteer'],
    ['FOODCARE_VOLUNTEER', 'Foodcare volunteer'],
    ['OTHER_VOLUNTEER', 'Other volunteer']
]);

export const STAFF_TYPE_CODEC = str;
