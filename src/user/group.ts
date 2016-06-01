import {Map} from 'immutable';
import {Injectable} from '@angular/core';

import {Type} from 'caesium-core/lang';
import {ManagerBase, ManagerOptions, SearchParameter} from "caesium-model/manager";
import {str, bool, map} from 'caesium-model/json_codecs';
import {Model, ModelBase, Property} from "caesium-model/model";


@Model({kind: 'user::UserGroup'})
export abstract class UserGroup extends ModelBase {
    @Property({codec: str})
    name:string;

    @Property({codec: map(bool), defaultValue: Map})
    permissions: Map<string,boolean>;
}

@Injectable()
export class UserGroupManager extends ManagerBase<UserGroup> {
    constructor(options: ManagerOptions) {
        super(options);
    }

    getModelType(): Type { return UserGroup; }
    
    getSearchParameters(): SearchParameter[] { return void 0; }


}
