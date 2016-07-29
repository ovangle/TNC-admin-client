import {List} from 'immutable';

import {StateException} from 'caesium-model/exceptions';
import {list, date, num} from 'caesium-model/json_codecs';
import {Model, ModelBase, Property} from 'caesium-model/model';
import {Name, NAME_CODEC, Gender, GENDER_CODEC} from '../basic';

import {CarerRel, CARER_REL_CODEC} from './carer_rel/carer_rel.model';
import {Carer} from './carer.model';

@Model({kind: 'member.dependent::Dependent'})
export abstract class Dependent extends ModelBase {
    // Used internally to set the carer rels.
    @Property({codec: list(CARER_REL_CODEC), defaultValue: List})
    carerRels: List<CarerRel>;

    @Property({codec: NAME_CODEC, defaultValue: () => new Name()})
    name: Name;

    @Property({codec: GENDER_CODEC, defaultValue: () => 'NOT_DISCLOSED'})
    gender: Gender;

    @Property({codec: date, allowNull: true, defaultValue: () => null})
    dateOfBirth: Date;

    setCarers(carers: List<Carer>): Dependent {
        if (carers.filter(carer => carer.id !== null).count() > 1) {
            throw new StateException('Cannot set carers. At most one carer id can be null');
        }

        let updatedCarerRels = carers.map(carer => {
            var currentRel = this.getCarerRel(carer);
            if (currentRel.carer.equals(carer)) {
                return currentRel;
            }
            return currentRel.set('carer', carer);
        }).toList();

        return <Dependent>this.set('carerRels', updatedCarerRels);
    }

    private getCarerRel(carer: Carer): CarerRel {
        return this.carerRels.find(
            carerRel => carerRel.carer.id === carer.id,
            null,
            new CarerRel({carer: carer})
        );
    }

}
