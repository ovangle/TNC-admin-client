import 'rxjs/add/observable/from';
import 'rxjs/add/operator/toArray';

import {Model, ModelBase, Property} from 'caesium-model/model';

import {Name, NAME_CODEC} from '../basic';

/**
 * Every Member and NonMemberPartner has exactly one
 * Carer associated with it.
 *
 * The carer just acts as an abstraction between the
 * member/partner and the relationship between them and
 * their dependents.
 */
@Model({kind: 'member.carer::Carer'})
export abstract class Carer extends ModelBase {
    @Property({codec: NAME_CODEC, readOnly: true})
    name: Name;
}
