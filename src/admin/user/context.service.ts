import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

import {Injectable} from '@angular/core';
import {Response as HttpResponse} from '@angular/http';
import {Router} from '@angular/router';

import {isBlank} from 'caesium-core/lang';
import {identity} from 'caesium-core/codec';
import {JsonObject} from 'caesium-json/json_codecs';

import {User} from './user.model';
import {UserManager} from './user.manager';

interface LoginErrors {
    usernameRequired?: boolean;
    usernameNotFound?: boolean;

    passwordRequired?: boolean;
    passwordIncorrect?: boolean;
}

@Injectable()
export class UserContext {

    constructor(
        private userManager: UserManager,
        private router: Router
    ) {}

    /**
     * The user, if one is logged in, otherwise `null`.
     */
    private userChange = new Subject<User>();
    user = this.userChange.asObservable().publishReplay(1).refCount();
    staffMember = this.user.map(user => isBlank(user) ? null : user.staffMember);

    private loginErrorChange = new Subject<LoginErrors>();
    loginError$ = this.loginErrorChange.asObservable().publishReplay(1).refCount();


    get loggedIn(): Observable<boolean> {
        return this.user.map(user => !isBlank(user));
    }

    initialize(): Promise<any> {
        this.loginErrorChange.next(null);
        return this.userManager.initialize()
            .forEach(user => {
                this.loginErrorChange.next(null);
                if (user === null) {
                    this.router.navigate(['/login']);
                    this.userChange.next(null);
                }
                this.userChange.next(user);
            });
    }

    loginUser(loginDetails: {username: string, password: string}): Promise<void> {
        var response = this.userManager.login(loginDetails);
        return response.handle({select: 200, decoder: this.userManager.modelCodec})
            .catch((response: HttpResponse) => {

                let errors: LoginErrors = null;
                if (response.status === 404) {
                    errors = Object.assign({}, errors, {usernameNotFound: true});
                } else if (response.status === 403) {
                    errors = Object.assign({}, errors, {passwordIncorrect: true});
                } else {
                    return Observable.throw(response);
                }

                this.loginErrorChange.next(errors);
                this.router.navigate(['/login']);

                return Observable.of(null);
            })
            .forEach((user: User) => {
                if (user !== null) {
                    this.loginErrorChange.next(null);
                    this.userChange.next(user);
                    this.router.navigate(['/']);
                }
            });

    }

    /*
    checkPermission(key: string, action: string): Observable<boolean> {
        return this.user
                .map(user => user.isAdmin || user.checkPermission(key, action));
    }
    */

    logout() {
        let response = this.userManager.logout();
        response.handle({select: 200, decoder: identity})
            .forEach((_: any) => {
                this.userChange.next(null);
                this.router.navigate(['/login']);
            });

    }
}
