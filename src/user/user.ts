import {Injectable} from '@angular/core';

import {Type} from 'caesium-core/lang';

import {Model, Property, ModelBase} from 'caesium-model/model';
import {ManagerBase, ManagerOptions, SearchParameter} from 'caesium-model/manager';
import {str, map, list, model, identity} from "caesium-model/json_codecs";

import {UserGroup} from './group';
import {Response} from "caesium-model/manager/request/interfaces";

const MATCH_TOKEN = /^([-a-f0-9]+)::([0-9]+)$/i;

@Model({kind: 'user::User'})
export abstract class User extends ModelBase {
    @Property({codec: str})
    username: string;

    @Property({
        codec: list(model(UserGroup)),
        defaultValue: () => Immutable.List<UserGroup>()
    })
    groups: Immutable.List<UserGroup>;

    @Property({
        codec: map(str),
        defaultValue: () => Immutable.Map<string,string>(),
        readOnly: true
    })
    permissions: Immutable.Map<string,string>;

    @Property({codec: identity, readOnly: true})
    session: SessionToken;
}

export interface LoginDetails {
    username: string;
    password: string;
}

export interface SessionToken {
    key: string;
    expires: Date;

}

@Injectable()
export class UserManager extends ManagerBase<User> {
    constructor(options: ManagerOptions) {
        super(options);
    }


    getModelType() { return User; }
    getModelSubtypes(): Type[] { return []; }
    getSearchParameters(): SearchParameter[] {
        return undefined;
    }

    fromSession(sessionToken:SessionToken): Response {
        // TODO: Simplifies when we move to typescript 2.0
        var request = this._requestFactory.put('session', identity);
        request.setRequestBody(sessionToken);
        return request.send();
    }

    login(loginDetails:LoginDetails): Response {
        var request = this._requestFactory.put('login', identity);
        request.setRequestBody(loginDetails);
        return request.send();
    }
}
