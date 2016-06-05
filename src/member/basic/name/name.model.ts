import {Record} from 'immutable';

import {recordCodec, str} from 'caesium-model/json_codecs';

const _NAME_RECORD = Record({firstName: '', lastName: '', alias: ''});

export class Name extends _NAME_RECORD {
    firstName: string;
    lastName: string;
    alias: string;
}

export const NAME_CODEC = recordCodec<Name>(
    {first: str, last: str, alias: str}, 
    (args) => new Name(args)
);


