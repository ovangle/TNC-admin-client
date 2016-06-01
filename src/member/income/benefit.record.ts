import {Pipe, PipeTransform} from 'angular2/core';
import {Record} from 'immutable';

import {isBlank} from 'caesium-core/lang';
import {Codec} from 'caesium-core/codec';
import {BenefitType, benefitTypeCodec} from './benefit_type.enum';

const _BENEFIT_RECORD = Record({type: BenefitType.NotDisclosed, otherType: null});

export class Benefit extends _BENEFIT_RECORD {
    type: BenefitType;
    otherType: string;
}

export const benefitCodec: Codec<Benefit, string> = {
    encode: (input: Benefit) => {
        if (isBlank(input))
            return input as any;
        if (input.type === BenefitType.Other) {
            if (isBlank(input.otherType))
                throw 'An `other` type is required for a benefit type of OTHER';
            return `${benefitTypeCodec.encode(input.type)} [${input.otherType}]`;
        }
        return benefitTypeCodec.encode(input.type);
    },
    decode: (input: string) => {
        var matchOther = input.match(/^OTHER \[(.*)\]$/);
        if (matchOther) {
            return new Benefit({type: BenefitType.Other, otherType: matchOther[1]});
        }
        return new Benefit({
            type: benefitTypeCodec.decode(input)
        });
    }
};

@Pipe({name: 'benefit'})
export class BenefitPipe implements PipeTransform {
    transform(value: any, args: any[]) {
        if (value instanceof Benefit) {
            switch(value.type) {
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
                    return 'Other (' + (value.otherType || 'unknown') + ')';
            }
        }
        throw new TypeError(`Expected a Benefit: ${value}`);
    }

}
