import {Map} from 'immutable';
import {Component, ViewEncapsulation} from '@angular/core';

import {isDefined} from 'caesium-core/lang';
import {identity} from "caesium-core/codec";

import {UserContext} from './context.service';
import {User} from './user.model';
import {UserManager} from './user.manager';

@Component({
    selector: 'login-page',
    template: `
        <div class="container">
        <div class="col-xs-2 col-sm-4"></div>
        <div class="login-body col-xs-8 col-sm-4 layout horizontal">
            <form (submit)="login()" class="flex">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" class="form-control"
                            [(ngModel)]="username">
                </div>    
            
                <div class="form-group">
                    <label for="password">Password</label>
                    <input id="password" type="password" class="form-control"
                           [(ngModel)]="password">
                </div>
                
                <input class="btn btn-primary" type="submit" value="Login">
            </form>
        </div>
        </div>
    `,
    styles: [`
    :host { 
        display: block; 
        height: 100%;
    }
    
    .login-body {
        height: 100%;
    }    
    
    `],
    styleUrls: [
        'assets/css/flex.css',
        'assets/css/bootstrap.css'
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

    login(): Promise<any> {
        var loginDetails = {username: this.username, password: this.password};
        var response = this.userManager.login(loginDetails);

        response.handle<any>({select: 401, decoder: identity})
            .forEach((errors:Map<string,any>) => {
                this.usernameError = errors.get('username');
                this.passwordError = errors.get('password');
            });

        return response.handle<User>({select: 200, decoder: this.userManager.modelCodec})
            .forEach((user:User) => this.userContext.setUser(user));
    }

}
