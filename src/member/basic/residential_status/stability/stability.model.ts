import {OrderedMap} from 'immutable';

import {enumToString} from 'caesium-model/json_codecs';


export const enum ResidentialStability {
    NotDisclosed,
    NoFixedAddress,
    Temporary,
    Permanent
}

const _STABILITY_SERIALIZED_VALUES = OrderedMap<ResidentialStability, string>([
    [ResidentialStability.NotDisclosed, 'NOT_DISCLOSED'],
    [ResidentialStability.NoFixedAddress, 'NO_FIXED_ADDRESS'],
    [ResidentialStability.Temporary, 'TEMPORARY'],
    [ResidentialStability.Permanent, 'PERMANENT']
]);

export const RESIDENTIAL_STABILITY_VALUES =
    _STABILITY_SERIALIZED_VALUES.keySeq().toList();

export const RESIDENTIAL_STABILITY_CODEC =
    enumToString<ResidentialStability>(_STABILITY_SERIALIZED_VALUES);

