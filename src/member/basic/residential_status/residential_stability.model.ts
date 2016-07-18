import {OrderedMap} from 'immutable';
import {Codec, identity} from 'caesium-core/codec';

export type ResidentialStability = 'NOT_DISCLOSED'
        | 'NO_FIXED_ADDRESS'
        | 'TEMPORARY'
        | 'PERMANENT';

export const RESIDENTIAL_STABILITY_VALUES = OrderedMap<ResidentialStability,string>([
    ['NOT_DISCLOSED', 'Not disclosed'],
    ['NO_FIXED_ADDRESS', 'No fixed address'],
    ['TEMPORARY', 'Temporary'],
    ['PERMANENT', 'Permanent']
]);

export const RESIDENTIAL_STABILITY_CODEC: Codec<ResidentialStability,string> = identity;
