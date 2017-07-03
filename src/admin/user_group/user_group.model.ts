import {Model, ModelBase, Property} from 'caesium-json/model';
import {str} from 'caesium-json/json_codecs'

@Model({kind: 'user::UserGroup'})
export class UserGroup extends ModelBase {
    @Property({codec: str})
    name:string;

    /*
    @Property({
        codec: PERMISSION_MAP_CODEC,
        defaultValue: () => Map<string,Set<string>>()
    })
    permissions: PermissionMap;
    */
}
