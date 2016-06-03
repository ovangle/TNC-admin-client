import {Model, ModelBase, Property, RefProperty} from 'caesium-model/model';

import {Dependent} from '../dependent.model';
import {Carer} from '../carer/carer.model';

import {CarerRelType, CARER_REL_TYPE_CODEC} from './carer_rel_type.model';
import {LivingArrangement, LIVING_ARRANGEMENT_CODEC} from './living_arrangement.model';

@Model({kind: 'dependent::CarerRel'})
export abstract class CarerRel extends ModelBase {
    @RefProperty({refName: 'dependent'})
    dependentId: number;
    dependent: Dependent;
    
    @RefProperty({refName: 'carer'})
    carerId: number;
    carer: Carer;

    @Property({
        codec: CARER_REL_TYPE_CODEC,
        defaultValue: () => CarerRelType.NotDisclosed
    })
    type: CarerRelType;

    @Property({
        codec: LIVING_ARRANGEMENT_CODEC,
        defaultValue: () => LivingArrangement.NotDisclosed
    })
    livingArrangment: LivingArrangement;

}

