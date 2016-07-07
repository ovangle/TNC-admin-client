import {OrderedMap} from 'immutable';

import {enumToString} from 'caesium-model/json_codecs'

export const enum StaffType {
    PermanentStaff,
    OfficeVolunteer,
    FoodcareVolunteer,
    OtherVolunteer
}

const _STAFF_TYPE_SERIALIZED_VALUES = OrderedMap<StaffType, string>([
    [StaffType.PermanentStaff, 'PERMANENT_STAFF'],
    [StaffType.OfficeVolunteer, 'OFFICE_VOLUNTEER'],
    [StaffType.FoodcareVolunteer, 'FOODCARE_VOLUNTEER'],
    [StaffType.OtherVolunteer, 'OTHER_VOLUNTEER']
]);

export const STAFF_TYPE_VALUES = _STAFF_TYPE_SERIALIZED_VALUES.keySeq().toList();

export const STAFF_TYPE_CODEC = enumToString<StaffType>(_STAFF_TYPE_SERIALIZED_VALUES);
