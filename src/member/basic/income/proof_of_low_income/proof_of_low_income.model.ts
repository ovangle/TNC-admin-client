import {OrderedMap} from 'immutable';

import {enumToString} from 'caesium-model/json_codecs';

export const enum ProofOfLowIncome {
    NoProof,
    PensionerConcessionCardSighted,
    LowIncomeHealthCareCardSighted
}

const _PROOF_OF_LOW_INCOME_SERIALIZED_VALUES = OrderedMap<ProofOfLowIncome, string>([
    [ProofOfLowIncome.NoProof, 'NO_PROOF'],
    [ProofOfLowIncome.PensionerConcessionCardSighted, 'PENSIONER_CONCESSION_CARD'],
    [ProofOfLowIncome.LowIncomeHealthCareCardSighted, 'LOW_INCOME_HEALTH_CARE_CARD']
]);

export const PROOF_OF_LOW_INCOME_VALUES = 
    _PROOF_OF_LOW_INCOME_SERIALIZED_VALUES.keySeq().toList();

export const PROOF_OF_LOW_INCOME_CODEC = enumToString<ProofOfLowIncome>(_PROOF_OF_LOW_INCOME_SERIALIZED_VALUES);
