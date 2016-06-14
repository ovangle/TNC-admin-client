import {Observable} from 'rxjs/Observable';
import {List} from 'immutable';

import {Model, ModelBase, Property, RefProperty} from 'caesium-model/model';
import {str, date} from 'caesium-model/json_codecs';

import {Name, NAME_CODEC} from '../basic';

import {CarerRel} from './carer_rel/carer_rel.model';

@Model({kind: 'member.dependent::Dependent'})
export abstract class Dependent extends ModelBase {
    // @BackRefProperty({to: CarerRel, refName: 'carer', multi: true})
    carers: List<CarerRel>;

    @Property({codec: NAME_CODEC})
    name: Name;

    @Property({codec: date})
    dateOfBirth: Date;
}
