import {Pipe, PipeTransform} from '@angular/core';

import {IncomeType} from './income_type.model';

@Pipe({name: 'incomeType'})
export class IncomeTypePipe implements PipeTransform {
    transform(value: any, args: any[]) {
        switch (value) {
            case IncomeType.None:
                return 'None';
            case IncomeType.NotDisclosed:
                return 'Not disclosed';
            case IncomeType.CentrelinkBenefit:
                return 'Centrelink benefit';
            case IncomeType.PartiallyEmployed:
                return `Part-time/casual employment`;
            case IncomeType.FullyEmployed:
                return 'Full-time employment';
            case IncomeType.SelfEmployed:
                return 'Self-employed';
            case IncomeType.SelfFundedRetiree:
                return 'Self-funded retiree';
            default:
                throw new TypeError(`Invalid income type: ${value}`);
        }
    }

}
