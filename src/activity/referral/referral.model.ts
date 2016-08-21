import {Record} from 'immutable';

import {recordCodec} from 'caesium-model/json_codecs';

export const _REFERRAL_RECORD = Record({});

export class Referral extends _REFERRAL_RECORD {

}

export const REFERRAL_CODEC = recordCodec<Referral>({

    },
    (args: any) => new Referral(args)
);

