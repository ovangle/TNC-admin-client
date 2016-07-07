import {Map, Record} from 'immutable';

import {recordCodec, str} from 'caesium-model/json_codecs';

const _NAME_RECORD = Record({firstName: '', lastName: '', alias: ''});

export class Name extends _NAME_RECORD {
    firstName: string;
    lastName: string;
    alias: string;

    toLowerCase(): Name {
        return <Name>this.withMutations((mutator) => {
            return mutator
                .set('firstName', this.firstName.toLowerCase())
                .set('lastName', this.lastName.toLowerCase())
                .set('alias', this.alias.toLowerCase());
        });
    }
}

export const NAME_CODEC = recordCodec<Name>(
    {firstName: str, lastName: str, alias: str},
    (args) => new Name(args)
);


