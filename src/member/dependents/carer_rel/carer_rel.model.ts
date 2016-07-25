import {Observable} from 'rxjs/Observable';

import {Record} from 'immutable';
import {recordCodec, model} from 'caesium-model/json_codecs';

import {Carer, CARER_CODEC} from '../carer.model';
import {RelationType, RELATION_TYPE_CODEC} from './relation_type.model';
import {LivingArrangement, LIVING_ARRANGEMENT_CODEC} from './living_arrangement.model';

import {Member} from '../../member.model';
import {MemberManager} from '../../member.manager';

const _CARER_REL_RECORD = Record({
    carer: null,
    livingArrangement: 'NOT_DISCLOSED',
    relationType: 'NO_RELATION',
});

export class CarerRel extends _CARER_REL_RECORD {
    carer: Carer;
    livingArrangement: LivingArrangement;
    relationType: RelationType;

    constructor(args?:{
        carer:Carer,
        livingArrangement?:LivingArrangement,
        relationType?:RelationType
    }) {
        super(args);
    }

    resolveCarer(memberManager: MemberManager): Observable<CarerRel> {
        return this.carer.resolveCarer(memberManager)
            .map(carer => <CarerRel>this.set('carer', carer));
    }
}

/**
 * Only supports decode.
 * @type {Codec<CarerRel, JsonObject>}
 */
export const CARER_REL_CODEC = recordCodec<CarerRel>({
    carer: CARER_CODEC,
    livingArrangement: LIVING_ARRANGEMENT_CODEC,
    relationType: RELATION_TYPE_CODEC,
}, (args: any) => new CarerRel(args));

