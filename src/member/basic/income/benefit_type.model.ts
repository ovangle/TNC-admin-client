import {OrderedMap} from 'immutable';
import {identity, Codec} from 'caesium-core/codec';

export type BenefitType = 'NONE'
        | 'NOT_DISCLOSED'
        | 'NEWSTART'
        | 'AGED'
        | 'DISABILITY'
        | 'CARER'
        | 'YOUTH_ALLOWANCE'
        | 'ABSTUDY'
        | 'AUSTUDY'
        | 'FAMILY_TAX_BENEFIT'
        | 'PARENTING_PAYMENT_PARTNERED'
        | 'PARENTING_PAYMENT_SINGLE'
        | 'OTHER';

export const BENEFIT_TYPE_VALUES = OrderedMap<BenefitType, string>([
    ['NOT_DISCLOSED', 'Not disclosed'],
    ['NEWSTART', 'Newstart'],
    ['AGED', 'Aged'],
    ['DISABILITY', 'Disability'],
    ['CARER', 'Carer'],
    ['YOUTH_ALLOWANCE', 'Youth allowance'],
    ['ABSTUDY', 'Abstudy'],
    ['AUSTUDY', 'Austudy'],
    ['FAMILY_TAX_BENEFIT', 'Family tax benefit'],
    ['PARENTING_PAYMENT_PARTNERED', 'Parenting payment (partnered)'],
    ['PARENTING_PAYMENT_SINGLE', 'Parenting payment (single)'],
    ['OTHER', 'Other']
]);

export const BENEFIT_TYPE_CODEC: Codec<BenefitType, string> = identity;
