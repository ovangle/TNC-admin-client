import {List, Iterable} from 'immutable';
import {AlertLabel, LabelSeverity, CheckForAlertLabels} from "../../utils/alert_label/alert_label.ts";

import {bool, num, recordCodec} from 'caesium-model/json_codecs';
import {IncomeSource, incomeSourceCodec} from './income_source.record';
import {
    ProofOfLowIncome, isPensionerConcessionCardSighted, isLowIncomeHealthCareCardSighted, noProofSighted
} from "./proof_of_low_income.flags";

export class IncomeInfo extends Immutable.Record({
    isLowIncome: false,
    proofOfLowIncomeFlags: ProofOfLowIncome.NoProofSighted,
    incomeSource: new IncomeSource()
}) implements CheckForAlertLabels {

    isLowIncome: boolean;
    proofOfLowIncomeFlags: number;
    incomeSource: IncomeSource;

    get isLowIncomeHealthCareCardSighted(): boolean {
        return isLowIncomeHealthCareCardSighted(this.proofOfLowIncomeFlags);
    }

    get isPensionerConcessionCardSighted(): boolean {
        return isPensionerConcessionCardSighted(this.proofOfLowIncomeFlags);
    }

    get noProofOfLowIncomeSighted(): boolean {
        return noProofSighted(this.proofOfLowIncomeFlags);
    }

    checkForAlertLabels(): Iterable<number, AlertLabel|Iterable<number, any>> {
        return _INCOME_INFO_LABELS
            .filter((label) => label.test(this));
    }
}

export const incomeInfoCodec = recordCodec<IncomeInfo>(
    {isLowIncome: bool, proofOfLowIncomeFlags: num, incomeSource: incomeSourceCodec},
    (args) => new IncomeInfo(args)
);


const _INCOME_INFO_LABELS = List<AlertLabel>([
    {
        text: 'Not low income',
        severity: LabelSeverity.Danger,
        tooltip: 'Member is not low income. Consult client assist worker before issuing vouchers',
        test: (income: IncomeInfo) => !income.isLowIncome
    },
    {
        text: 'No proof of low income',
        severity: LabelSeverity.Warning,
        tooltip: 'Request low income card on member contact',
        test: (income:IncomeInfo) => income.noProofOfLowIncomeSighted
    }
]);



