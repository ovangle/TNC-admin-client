import {OrderedMap} from 'immutable';
import {Pipe, PipeTransform} from '@angular/core';
import {enumToString} from 'caesium-model/json_codecs';

export const enum IncomeType {
    None = 0,
    NotDisclosed,
    CentrelinkBenefit,
    // Part time or casual employment
    PartiallyEmployed,
    FullyEmployed,
    SelfEmployed,
    SelfFundedRetiree,
}

const _INCOME_TYPE_SERIALIZED_VALUES = OrderedMap<IncomeType, string>([
    [IncomeType.None, 'NONE'],
    [IncomeType.NotDisclosed, 'NOT_DISCLOSED'],
    [IncomeType.CentrelinkBenefit, 'CENTRELINK_BENEFIT'],
    [IncomeType.PartiallyEmployed, 'PARTIALLY_EMPLOYED'],
    [IncomeType.FullyEmployed, 'FULLY_EMPLOYED'],
    [IncomeType.SelfEmployed, 'SELF_EMPLOYED'],
    [IncomeType.SelfFundedRetiree, 'SELF_FUNDED_RETIREE'],
]);

export const INCOME_TYPE_VALUES = _INCOME_TYPE_SERIALIZED_VALUES.keySeq().toList();

export const incomeTypeCodec = enumToString<IncomeType>(_INCOME_TYPE_SERIALIZED_VALUES);

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
