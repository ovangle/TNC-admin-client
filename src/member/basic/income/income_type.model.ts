import {Codec, identity} from 'caesium-core/codec';
import {OrderedMap} from 'immutable';

export type IncomeType = 'NONE'
        | 'NOT_DISCLOSED'
        | 'CENTRELINK_BENEFIT'
        | 'PARTIALLY_EMPLOYED'
        | 'FULLY_EMPLOYED'
        | 'SELF_EMPLOYED'
        | 'SELF_FUNDED_RETIREE';

export const INCOME_TYPE_VALUES = OrderedMap<IncomeType, string>([
    ['NONE', 'None'],
    ['NOT_DISCLOSED', 'Not disclosed'],
    ['CENTRELINK_BENEFIT', 'Centrelink benefit'],
    ['PARTIALLY_EMPLOYED', 'Part-time or casual employment'],
    ['FULLY_EMPLOYED', 'Full-time employment'],
    ['SELF_EMPLOYED', 'Self employed'],
    ['SELF_FUNDED_RETIREE', 'Self-funded retiree']
]);

export const INCOME_TYPE_CODEC: Codec<IncomeType, string> = identity;
