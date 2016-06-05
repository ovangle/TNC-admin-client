import {Pipe, PipeTransform} from '@angular/core';

import {ResidentialStability} from './stability.model';

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
