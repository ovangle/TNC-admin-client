import {Iterable, Record, List} from 'immutable';

import {recordCodec, str} from 'caesium-model/json_codecs';

import {AlertLabel, CheckForAlertLabels, LabelSeverity} from '../../../utils/alert_label/alert_label';

import {BenefitType, BENEFIT_TYPE_CODEC} from './benefit_type.model';
import {IncomeType, INCOME_TYPE_CODEC} from './type';
import {ProofOfLowIncome, PROOF_OF_LOW_INCOME_CODEC} from './proof_of_low_income';

const _INCOME_RECORD = Record({
    type: IncomeType.NotDisclosed,
    benefitType: 'NONE',
    benefitOtherDescription: null,
    proofOfLowIncome: ProofOfLowIncome.NoProof
});

export class Income extends _INCOME_RECORD implements CheckForAlertLabels {
    type: IncomeType;
    benefitType: BenefitType;
    benefitOtherDescription: string;
    proofOfLowIncome: ProofOfLowIncome;

    checkForAlertLabels():Iterable.Indexed<AlertLabel|Iterable.Indexed<any>> {
        return _INCOME_INFO_LABELS
            .filter((label) => label.test(this))
            .toIndexedSeq();
    }
}

export const INCOME_CODEC = recordCodec<Income>(
    {
        type: INCOME_TYPE_CODEC,
        benefitType: BENEFIT_TYPE_CODEC,
        benefitOtherDescriptions: str,
        proofOfLowIncome: PROOF_OF_LOW_INCOME_CODEC
    },
    (args) => new Income(args)
);

const _INCOME_INFO_LABELS = List<AlertLabel>([
    {
        text: 'No proof of low income',
        severity: LabelSeverity.Warning,
        tooltip: 'Request low income card on member contact',
        test: (income:Income) => (income.proofOfLowIncome === ProofOfLowIncome.NoProof)
    }
]);


