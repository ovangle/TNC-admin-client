import {Pipe, PipeTransform} from '@angular/core';

import {ArgumentError} from 'caesium-model/exceptions';
import {ProofOfLowIncome} from './proof_of_low_income.model';

@Pipe({name: 'proofOfLowIncome'})
export class ProofOfLowIncomePipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        switch (value) {
            case ProofOfLowIncome.NoProof:
                return 'No proof provided';
            case ProofOfLowIncome.LowIncomeHealthCareCardSighted:
                return 'Low income health care card sighted';
            case ProofOfLowIncome.PensionerConcessionCardSighted:
                return 'Pensioner concession card sighted';
            default:
                throw new ArgumentError('Invalid proof of low income value: ' + value);
        }
    }

}
