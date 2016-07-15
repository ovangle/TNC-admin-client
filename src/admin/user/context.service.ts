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
    /**
     * The user, if one is logged in, otherwise `null`.
     */
    user: User;

    userChange = new Subject<User>();

    constructor(
        private userManager: UserManager,
        private router: Router
    ) {
        this.user = null;
    }

    get loggedIn(): boolean { return !isBlank(this.user); }

    initialize(): Promise<any> {
        return this.userManager.initialize()
            .forEach(user => {
                if (user === null) {
                    return this.router.navigate(['/login']).then(success => {
                        console.log('successfully navigated', success);
                    }).catch(err => {
                        console.error('Router error', err);
                        throw err;
                    });
                }
                return this.setUser(user)
            });
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
