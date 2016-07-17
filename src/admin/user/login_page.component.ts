import 'rxjs/add/operator/debounceTime';

import {Component, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {UserLoginForm} from './login_form/login_form.component';

@Component({
    selector: 'login-page',
    template: `
    <div class="container">
        <div class="col-xs-2 col-sm-4"></div>
        <div class="login-body col-xs-8 col-sm-4 layout horizontal">
            <user-login-form class="flex"></user-login-form>
        </div>
    </div>
    `,
    directives: [UserLoginForm],
    styles: [`
    :host {
        display: block;
        height: 100%;
    }
    
    .container {
        height: 100%; 
    }    

    .login-body {
        height: 100%;
        justify-content: center;
        align-items: center;
    }
    `],
    styleUrls: [
        'assets/css/flex.css',
        'assets/css/bootstrap.css'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.Native
})
export class LoginPage {

}

