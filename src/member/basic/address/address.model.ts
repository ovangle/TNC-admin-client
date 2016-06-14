import {Record} from 'immutable';
import {str, recordCodec} from "caesium-model/json_codecs";

const _ADDRESS_RECORD = Record({street: '', city: '', postcode: ''});

export class Address extends _ADDRESS_RECORD {
    street: string;
    city: string;
    postcode: string;
}

export const ADDRESS_CODEC = recordCodec<Address>({
    street: str,
    city: str,
    postcode: str
}, (args) => new Address(args));


