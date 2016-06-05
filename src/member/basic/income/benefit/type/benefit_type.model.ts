import {OrderedMap} from 'immutable';
import {Pipe, PipeTransform} from '@angular/core';
import {isBlank} from 'caesium-core/lang';
import {enumToString} from 'caesium-model/json_codecs';

export const enum BenefitType {
    None,
    NotDisclosed,
    Newstart,
    Aged,
    Disability,
    Carer,
    YouthAllowance,
    Abstudy,
    Austudy,
    FamilyTaxBenefit,
    ParentingPaymentPartnered,
    ParentingPaymentSingle,
    Other
}

const _BENEFIT_TYPE_SERIALIZED_VALUES = OrderedMap<BenefitType, string>([
    [BenefitType.None, 'NONE'],
    [BenefitType.NotDisclosed, 'NOT_DISCLOSED'],
    [BenefitType.Newstart, 'NEWSTART'],
    [BenefitType.Aged, 'AGED'],
    [BenefitType.Disability, 'DISABILITY'],
    [BenefitType.Carer, 'CARER'],
    [BenefitType.YouthAllowance, 'YOUTH_ALLOWANCE'],
    [BenefitType.Abstudy, 'ABSTUDY'],
    [BenefitType.Austudy, 'AUSTUDY'],
    [BenefitType.FamilyTaxBenefit, 'FAMILY_TAX_BENEFIT'],
    [BenefitType.ParentingPaymentPartnered, 'PARENTING_PAYMENT_PARTNERED'],
    [BenefitType.ParentingPaymentSingle, 'PARENTING_PAYMENT_SINGLE'],
    [BenefitType.Other, 'OTHER']
]);

export const BENEFIT_TYPE_VALUES = _BENEFIT_TYPE_SERIALIZED_VALUES.keySeq().toList();

export const BENEFIT_TYPE_CODEC = enumToString<BenefitType>(_BENEFIT_TYPE_SERIALIZED_VALUES);


