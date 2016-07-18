import {OrderedMap} from 'immutable';
import {Codec, identity} from 'caesium-core/codec';

export type ProofOfLowIncome = 'NO_PROOF'
        | 'PENSIONER_CONCESSION_CARD'
        | 'LOW_INCOME_HEALTH_CARE_CARD';

export const PROOF_OF_LOW_INCOME_VALUES = OrderedMap<ProofOfLowIncome,string>([
    ['NO_PROOF', 'No proof'],
    ['PENSIONER_CONCESSION_CARD', 'Pensioner concession card sighted'],
    ['LOW_INCOME_HEALTH_CARE_CARD', 'Low income health care card sighted']
]);

export const PROOF_OF_LOW_INCOME_CODEC: Codec<ProofOfLowIncome, string> = identity;
