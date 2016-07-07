import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs/Subject';
import {Map} from 'immutable';

import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {isBlank} from 'caesium-core/lang';
import {identity} from 'caesium-core/codec';
import {JsonObject} from 'caesium-model/json_codecs';

import {User} from './user.model';
import {UserManager} from './user.manager';


@Injectable()
export class UserContext {


    router: Router;

    /**
     * The user, if one is logged in, otherwise `null`.
     */
    user: User;

    userChange = new Subject<User>();

    constructor(private userManager: UserManager) {
        this.user = null;
    }

    get loggedIn(): boolean { return !isBlank(this.user); }

    initialize(): Promise<boolean> {
        return this.userManager.initialize()
            .forEach(user => this.setUser(user))
            .then((_) => !isBlank(this.user));
    }

    setUser(user: User) {
        this.userChange.next(user);
        this.user = user;
    }

    checkPermission(key: string, action: string): boolean {
        return this.user
            && (this.user.isAdmin || this.user.checkPermission(key, action));
    }
}
