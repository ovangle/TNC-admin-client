import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';

import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

import {Injectable} from '@angular/core';
import {Response as HttpResponse} from '@angular/http';
import {Router} from '@angular/router';

import {isBlank} from 'caesium-core/lang';
import {identity} from 'caesium-core/codec';
import {JsonObject} from 'caesium-model/json_codecs';

import {User} from './user.model';
import {UserManager} from './user.manager';

interface LoginErrors {
    username: {notfound: boolean};
    password: {invalid: boolean};
}

@Injectable()
export class UserContext {
    private _user: User;

    /**
     * The user, if one is logged in, otherwise `null`.
     */
    get user(): Observable<User> {
        if (this._user !== null) {
            return Observable.of(this._user);
        }
        return this.userChange.first();
    }
    private userChange = new Subject<User>();

    constructor(
        private userManager: UserManager,
        private router: Router
    ) {
        this._user = null;
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

    loginUser(loginDetails: {username: string, password: string}): Observable<User | LoginErrors> {
        var response = this.userManager.login(loginDetails);
        return response.handle({select: 200, decoder: this.userManager.modelCodec})
            .map(user => {
                this.setUser(user);
                this.router.navigate(['']);
                return user;
            })
            .catch((response: HttpResponse) => {
                var errors: LoginErrors = {username: null, password: null};
                if (response.status === 404) {
                    errors.username = {notfound: true};
                    return Observable.of<LoginErrors>(errors);
                } else if (response.status === 403) {
                    errors.password = {invalid: true};
                    return Observable.of<LoginErrors>(errors);
                } else {
                    return Observable.throw(response);
                }
            });

    }

    setUser(user: User) {
        this.userChange.next(user);
        this._user = user;
    }

    checkPermission(key: string, action: string): Observable<boolean> {
        return this.user
                .map(user => user.isAdmin || user.checkPermission(key, action));
    }
}
