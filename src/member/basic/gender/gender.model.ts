import {OrderedMap} from 'immutable';

import {enumToString} from 'caesium-model/json_codecs';

export const enum Gender {
    NotDisclosed,
    Male,
    Female
}

const _GENDER_SERIALIZED_VALUES = OrderedMap<Gender,string>([
    [Gender.NotDisclosed, 'NOT_DISCLOSED'],
    [Gender.Male, 'MALE'],
    [Gender.Female, 'FEMALE']
]);

export const GENDER_CODEC = enumToString<Gender>(_GENDER_SERIALIZED_VALUES);

export const GENDER_VALUES = _GENDER_SERIALIZED_VALUES.keySeq().toList();

