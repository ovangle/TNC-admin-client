import {Pipe, PipeTransform} from '@angular/core';

import {ArgumentError} from 'caesium-model/exceptions';
import {BenefitType} from './benefit_type.model';

@Pipe({name: 'benefitType'})
export class BenefitTypePipe implements PipeTransform {
    transform(value: any, args: any[]) {
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
        throw new ArgumentError('Not a valid benefit type value: ' + value);
    }
}
