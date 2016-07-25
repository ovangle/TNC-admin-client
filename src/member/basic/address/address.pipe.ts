import {Pipe, PipeTransform} from '@angular/core';
import {isBlank} from 'caesium-core/lang';

import {Address} from './address.model';

@Pipe({name: 'address'})
export class AddressPipe implements PipeTransform {
    transform(value: any, args: any[]) {
        if (isBlank(value))
            return value;
        if (value instanceof Address) {
            let formatted = value.street;
            if (value.city !== '') {
                formatted += (', ' + value.city);
            }
            if (value.postcode !== '') {
                formatted += ('\u00A0' + value.postcode);
            }
            return formatted;
        }
        throw new TypeError(`Not an address: ${value}`);
    }

    private _cityPostcode(address: Address) {
        return `${address.city}\u00A0${address.postcode}`
    }
}
