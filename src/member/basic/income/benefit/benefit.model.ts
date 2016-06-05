import {Pipe, PipeTransform} from '@angular/core';
import {Record} from 'immutable';

import {recordCodec, str} from 'caesium-model/json_codecs';

import {BenefitType, BENEFIT_TYPE_CODEC} from './type';

const _BENEFIT_RECORD = Record({type: BenefitType.NotDisclosed, otherType: null});

export class Benefit extends _BENEFIT_RECORD {
    type: BenefitType;
    otherType: string;
}

export const BENEFIT_CODEC = recordCodec<Benefit>(
    {type: BENEFIT_TYPE_CODEC, otherType: str},
    (args) => new Benefit(args)
);
