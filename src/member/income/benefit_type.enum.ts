import {OrderedMap} from 'immutable';
import {Pipe, PipeTransform} from 'angular2/core';
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

export const benefitTypeCodec = enumToString<BenefitType>(_BENEFIT_TYPE_SERIALIZED_VALUES);


@Pipe({name: 'benefitType'})
export class BenefitTypePipe implements PipeTransform {
    transform(value: any, args: any[]) {
        if (isBlank(value))
            return value;
        switch(value) {
            case BenefitType.None:
                return 'None';
            case BenefitType.NotDisclosed:
                return 'Not disclosed';
            case BenefitType.Newstart:
                return 'Newstart';
            case BenefitType.Aged:
                return 'Aged';
            case BenefitType.Disability:
                return 'Disability';
            case BenefitType.Carer:
                return 'Carer';
            case BenefitType.YouthAllowance:
                return 'Youth allowance';
            case BenefitType.Abstudy:
                return 'Abstudy';
            case BenefitType.Austudy:
                return 'Austudy';
            case BenefitType.FamilyTaxBenefit:
                return 'Family tax benefit';
            case BenefitType.ParentingPaymentPartnered:
                return 'Parenting payment (partnered)';
            case BenefitType.ParentingPaymentSingle:
                return 'Parenting payment (single)';
            case BenefitType.Other:
                return 'Other';
        }
        throw new TypeError(`Expected a Benefit: ${value}`);
    }
}
