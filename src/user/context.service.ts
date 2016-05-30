import {Observable} from 'rxjs/Observable';

import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';

import {isBlank} from 'caesium-core/lang';
import {identity} from 'caesium-core/codec';

import {User, UserManager} from './user';
import {loadToken, saveToken, isExpired} from './session';


@Injectable()
export class UserContext {

    sessionToken: string;

    router: Router;

    /**
     * The user, if one is logged in, otherwise `null`.
     */
    user: User;

    private userManager: UserManager;

    constructor(userManager: UserManager, router: Router) {
        this.user = null;
        this.router = router;
        this.userManager = userManager;
    }

    get loggedIn(): boolean { return !isBlank(this.user); }

    initialize(): Promise<User> {
        var sessionToken = loadToken();
        if (!sessionToken || isExpired(sessionToken)) {
            return this.requireLogin();
        }
        var response = this.userManager.fromSession(sessionToken);
        var success = response.handle({select: 200, decoder: this.userManager.modelCodec}).forEach((user) => {
            this.user = user;
        }, this);
        var failure = response.handle({select: 500, decoder: identity}).forEach((errors) => {
            console.log('Session invalid: ' + JSON.stringify(errors));
            this.requireLogin();
        }, this);

        return Promise.all([success, failure]).then((_) => {
            return this.user;
        })
    }

    setUser(user: User): Promise<any> {
        saveToken(user.session);
        this.user = user;
        return this.router.navigate(['Dashboard']);
    }

    requireLogin(): Promise<any> {
        return this.router.navigate(['Login']);
    }

}
