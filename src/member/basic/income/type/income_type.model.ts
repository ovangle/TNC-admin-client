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

export const INCOME_TYPE_CODEC = enumToString<IncomeType>(_INCOME_TYPE_SERIALIZED_VALUES);

