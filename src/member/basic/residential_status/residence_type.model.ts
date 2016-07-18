import {OrderedMap} from 'immutable';
import {Codec, identity} from 'caesium-core/codec';


export type ResidenceType = 'NOT_DISCLOSED'
        | 'NONE'
        | 'CARAVAN_PARK'
        | 'MOTEL'
        | 'PRIVATE_RENTAL'
        | 'PUBLIC_HOUSING'
        | 'COMMUNITY_HOUSING'
        | 'BOARDING'
        | 'OWN_HOME';

export const RESIDENCE_TYPE_VALUES = OrderedMap<ResidenceType, string>([
    ['NOT_DISCLOSED', 'Not disclosed'],
    ['CARAVAN_PARK', 'Caravan park'],
    ['MOTEL', 'Motel'],
    ['PRIVATE_RENTAL', 'Private rental'],
    ['PUBLIC_HOUSING', 'Public housing'],
    ['COMMUNITY_HOUSING', 'Community housing'],
    ['BOARDING', 'Boarding or staying with friends/family'],
    ['OWN_HOME', 'Own home']
]);

export const RESIDENCE_TYPE_CODEC: Codec<ResidenceType,string> = identity;
