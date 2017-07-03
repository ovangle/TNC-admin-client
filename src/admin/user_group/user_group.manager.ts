import {List} from 'immutable';
import {Observable} from 'rxjs/Observable';

import {Injectable} from '@angular/core';

import {Type} from 'caesium-core/lang';
import {itemList} from 'caesium-json/json_codecs';
import {ManagerBase, ManagerOptions} from 'caesium-json/manager';

import {UserGroup} from './user_group.model';

@Injectable()
export class UserGroupManager extends ManagerBase<UserGroup> {
    constructor(options: ManagerOptions) {
        super(UserGroup, options);
    }

    getModelSubtypes(): Type<any>[] { return []; }

    listGroups(): Observable<List<UserGroup>> {
        var request = this._requestFactory.get('groups');
        var response = request.send();
        return response.handle({select: 200, decoder: itemList(this.modelCodec)});
    }
}
