import {Observable} from 'rxjs/Observable';
import {List} from 'immutable';

import {Model, ModelBase, Property, RefProperty} from 'caesium-model/model';
import {str, date} from 'caesium-model/json_codecs';

import {CarerRel} from './carer_rel/carer_rel.model';

@Model({kind: 'dependent::Dependent', isAbstract: true})
export abstract class Dependent extends ModelBase {
    // @BackRefProperty({to: CarerRel, refName: 'carer', multi: true})
    // carers: List<CarerRel>;

    @Property({codec: str})
    firstName: string;

    @Property({codec: str})
    lastName: string;

    @Property({codec: date})
    dateOfBirth: Date;
}
