import {List} from 'immutable';
import {Observable} from 'rxjs/Observable';

import {Injectable} from '@angular/core';

import {Type} from 'caesium-core/lang';
import {itemList} from 'caesium-model/json_codecs';
import {ManagerBase, ManagerOptions, SearchParameter} from 'caesium-model/manager';

import {UserGroup} from './user_group.model';

@Injectable()
export class UserGroupManager extends ManagerBase<UserGroup> {
    constructor(options: ManagerOptions) {
        super(options);
    }

    getModelType(): Type { return UserGroup; }
    getModelSubtypes(): Type[] { return []; }
    getSearchParameters(): SearchParameter[] { return void 0; }

    listGroups(): Observable<List<UserGroup>> {
        var request = this._requestFactory.get('groups');
        var response = request.send();
        return response.handle({select: 200, decoder: itemList(this.modelCodec)});
    }
}
