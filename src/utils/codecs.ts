import {List, Set} from 'immutable';

import {Codec} from 'caesium-core/codec';
export {composeCodecs} from 'caesium-core/codec';

import {formatPhoneNumber} from './pipes/phone_number.pipe';

export const setToList: Codec<Set<any>,List<any>> = {
    encode: (set: Set<any>) => set.toList(),
    decode: (list: List<any>) => list.toSet()
};

export function phoneNumber(fmtString: string): Codec<string,string> {
    return {
        encode: (input: string) => {
            return input.replace(/\D/g, '');
        },
        decode: (input: string) => {
            return formatPhoneNumber(input, fmtString);
        }
    }
}

