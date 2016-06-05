import {Pipe, PipeTransform} from '@angular/core';
import {isBlank} from 'caesium-core/lang';

import {Address} from './address.model';

@Pipe({name: 'address'})
export class AddressPipe implements PipeTransform {
    transform(value: any, args: any[]) {
        if (isBlank(value))
            return value;
        if (value instanceof Address) {
            return `${value.street}, ${value.city}\u00A0${value.postcode}`
        }
        throw new TypeError(`Not an address: ${value}`);
    }
}
