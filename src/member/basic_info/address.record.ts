import {Record} from 'immutable';

import {isBlank} from 'caesium-core/lang';
import {str, recordCodec} from "caesium-model/json_codecs";
import {Pipe, PipeTransform} from "angular2/core";

const _ADDRESS_RECORD = Record({street: null, city: null, postcode: null});

export class Address extends _ADDRESS_RECORD {
    street: string;
    city: string;
    postcode: string;
}

export const addressCodec = recordCodec<Address>({
    street: str,
    city: str,
    postcode: str
}, (args) => new Address(args));

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

