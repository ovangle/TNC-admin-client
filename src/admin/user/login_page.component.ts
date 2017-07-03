import 'rxjs/add/operator/debounceTime';

import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'login-page',
    template: `
    <style>
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
    </style>
    <div class="container">
        <div class="col-xs-2 col-sm-4"></div>
        <div class="login-body col-xs-8 col-sm-4 layout horizontal">
            <user-login-form class="flex"></user-login-form>
        </div>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {

}

