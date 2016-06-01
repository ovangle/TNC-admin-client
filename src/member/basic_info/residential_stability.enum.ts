import {Map} from 'immutable';

import {Pipe, PipeTransform} from '@angular/core';

import {enumToString} from 'caesium-model/json_codecs';


export const enum ResidentialStability {
    NotDisclosed,
    NoFixedAddress,
    Temporary,
    Permanent
}

const _STABILITY_SERIALIZED_VALUES = Map<string,ResidentialStability>({
    'NOT_DISCLOSED': ResidentialStability.NotDisclosed,
    'NO_FIXED_ADDRESS': ResidentialStability.NoFixedAddress,
    'TEMPORARY': ResidentialStability.Temporary,
    'PERMANENT': ResidentialStability.Permanent
});

export const RESIDENTIAL_STABILITY_VALUES =
    _STABILITY_SERIALIZED_VALUES.valueSeq().toList();

export const residentialStabilityCodec = enumToString<ResidentialStability>(_STABILITY_SERIALIZED_VALUES.flip());

@Pipe({name: 'residentialStability'})
export class ResidentialStabilityPipe implements PipeTransform {
    transform(value: any, args: any[]) {
        switch (value) {
            case ResidentialStability.NotDisclosed:
                return 'Not disclosed';
            case ResidentialStability.NoFixedAddress:
                return 'No fixed address';
            case ResidentialStability.Temporary:
                return 'Temporary';
            case ResidentialStability.Permanent:
                return 'Permanent';
            default:
                throw new TypeError(`Not a ResidentialStability value: ${value}`);
        }
    }
}
