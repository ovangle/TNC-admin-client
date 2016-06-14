import {Record} from 'immutable';
import {recordCodec, model} from 'caesium-model/json_codecs';

import {Dependent} from '../dependent.model';
import {Carer} from '../../carer/carer.model';

import {CarerRelType, CARER_REL_TYPE_CODEC} from './type/carer_rel_type.model';
import {LivingArrangement, LIVING_ARRANGEMENT_CODEC} from './living_arrangement/living_arrangement.model';

const _CARER_REL_RECORD = Record({
    carer: null,
    livingArrangement: LivingArrangement.Never,
    relationType: CarerRelType.NotDisclosed
});

export class CarerRel extends _CARER_REL_RECORD {
    carer: Carer;
    livingArrangement: LivingArrangement;
    relationType: CarerRelType;
}

export const CARER_REL_CODEC = recordCodec<CarerRel>({
    carer: model<Carer>(Carer),
    livingArrangement: LIVING_ARRANGEMENT_CODEC,
    relationType: CARER_REL_TYPE_CODEC
}, (args) => new CarerRel(args));

