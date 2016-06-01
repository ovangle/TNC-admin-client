import {Record} from 'immutable';

import {Injectable, Pipe, PipeTransform} from 'angular2/core';

import {Codec} from 'caesium-core/codec';
import {isBlank} from 'caesium-core/lang';
import {EncodingException} from 'caesium-model/exceptions';

import {IncomeType, incomeTypeCodec, IncomeTypePipe} from './income_type.enum';
import {Benefit, benefitCodec, BenefitPipe} from './benefit.record';

const _INCOME_SOURCE_RECORD = Record({
    type: IncomeType.None,
    benefit: new Benefit()
});

export class IncomeSource extends _INCOME_SOURCE_RECORD {
    type: IncomeType;
    /** The benefit (or `null` if the type is not CENTRELINK_BENEFIT) */
    benefit: Benefit;
}

export const incomeSourceCodec: Codec<IncomeSource, string> = {
    encode: (input: IncomeSource) => {
        if (isBlank(input))
            return input as any;
        if (input.type === IncomeType.CentrelinkBenefit) {
            if (isBlank(input.benefit))
                throw new EncodingException('An incomeSource of type CENTRELINK_BENEFIT must provide a benefit');
            return `CENTRELINK_BENEFIT [${benefitCodec.encode(input.benefit)}]`;
        }
        return incomeTypeCodec.encode(input.type);
    },
    decode: (input: string) => {
        if (isBlank(input)) {
            return input as any;
        }
        var benefitMatch = input.match(/^CENTRELINK_BENEFIT \[(.*)\]$/);
        if (benefitMatch) {
            return new IncomeSource({
                type: IncomeType.CentrelinkBenefit,
                benefit: benefitCodec.decode(benefitMatch[1])
            });
        }
        return new IncomeSource({type: incomeTypeCodec.decode(input)});
    }
};

@Pipe({name: 'incomeSource'})
@Injectable()
export class IncomeSourcePipe implements PipeTransform {
    private benefitPipe: BenefitPipe;
    private incomeTypePipe: IncomeTypePipe;
    
    constructor(
        benefitPipe: BenefitPipe,
        incomeTypePipe: IncomeTypePipe) {
        this.benefitPipe = benefitPipe;
        this.incomeTypePipe = incomeTypePipe;
    }
    

    transform(value: any, args: any[]) {
        if (isBlank(value))
            return value;
        if (!(value instanceof IncomeSource)) {
            throw new TypeError('Not an IncomeSource: ' + value.toString());
        }
        var fmt = this.incomeTypePipe.transform(value.type, []);
        if (value.type === IncomeType.CentrelinkBenefit) {
            fmt += `: ${this.benefitPipe.transform(value.benefit, [])}`
        }
        return fmt;
        
    }
}
