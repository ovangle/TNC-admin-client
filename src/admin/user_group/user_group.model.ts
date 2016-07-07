import {Map} from 'immutable';

import {Model, ModelBase, Property} from 'caesium-model/model';
import {str} from 'caesium-model/json_codecs'

import {PermissionMap, PERMISSION_MAP_CODEC} from '../permissions';


@Model({kind: 'user::UserGroup'})
export abstract class UserGroup extends ModelBase {
    @Property({codec: str})
    name:string;

    @Property({
        codec: PERMISSION_MAP_CODEC,
        defaultValue: () => Map<string,Set<string>>()
    })
    permissions: PermissionMap;
}
