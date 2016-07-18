import {OrderedMap} from 'immutable';
import {Codec, identity} from 'caesium-core/codec';

export type Gender = 'UNKNOWN' | 'MALE' | 'FEMALE' | 'OTHER';

export const GENDER_VALUES = OrderedMap<Gender,string>([
    ['UNKNOWN', 'Unknown'],
    ['MALE', 'Male'],
    ['FEMALE', 'Female'],
    ['OTHER', 'Other']
]);

export const GENDER_CODEC: Codec<Gender,string> = identity;
