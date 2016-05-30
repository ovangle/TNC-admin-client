import {Component, ViewEncapsulation} from 'angular2/core';

import {isDefined} from 'caesium-core/lang';
import {identity} from "caesium-core/codec";

import {UserContext} from './context.service';
import {User, UserManager} from './user';

@Component({
    selector: 'login-page',
    template: `
        <form class="layout vertical">
            <div class="layout horizontal">
                <label for="username">Username</label>
                <input type="text" name="username" [(ngModel)]="username">
            </div>
            
            <div class="layout horizontal">
                <label for="password">Password</label>
                <input type="text" name="password" [(ngModel)]="password">
            </div>
            
            <input type="submit" value="Login">
        </form>
    `,
    styles: [`
    :host { 
        display: block; 
        height: 100%;
    }
    `],
    styleUrls: [
        'assets/css/flex.css'
    ],
    encapsulation: ViewEncapsulation.Native
})
export class LoginPage {

    username: string;
    usernameError: string;

    password: string;
    passwordError: string;

    private userManager: UserManager;
    private userContext: UserContext;

    constructor(
        userManager: UserManager,
        userContext: UserContext
    ) {
        this.userManager = userManager;
        this.userContext = userContext;
    }

    onSubmit(): Promise<any> {
        var loginDetails = {username: this.username, password: this.password};
        var response = this.userManager.login(loginDetails);

        var success = response.handle<User>({select: 200, decoder: this.userManager.modelCodec})
            .forEach((user) => this.userContext.setUser(user), this);

        var loginFailure = response.handle<any>({select: 401, decoder: identity})
            .forEach((errors) => {
                if (isDefined(errors['username'])) {
                    this.usernameError = errors['username'];
                }
                if (isDefined(errors['passwrod'])) {
                    this.passwordError = errors['password'];
                }
            }, this);
        return Promise.all([success, loginFailure]);
    }

}
