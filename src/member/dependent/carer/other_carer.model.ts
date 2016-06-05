import {Model, ModelBase, Property} from 'caesium-model/model';
import {str} from 'caesium-model/json_codecs';

import {Carer} from './carer.model';

@Model({kind: 'dependent::OtherCarer'})
export abstract class OtherCarer extends ModelBase implements Carer{
    @Property({codec: str})
    firstName: string;

    @Property({codec: str})
    lastName: string;

}
