import {Component, ViewEncapsulation, ChangeDetectionStrategy} from "@angular/core";
import {ROUTER_DIRECTIVES, Routes} from '@angular/router';

import {NavBarComponent} from './layout/nav_bar.component'
import {UserManager} from './admin/user/user.model';
import {UserContext} from './admin/user/context.service';
import {LoginPage} from './admin/user/login_page.component';

import {MemberHome} from './member/home.component';

@Component({
    selector: 'main-app',
    template: `
        <header>
            <nav-bar></nav-bar>
        </header>
        <main class="flex">
            <router-outlet></router-outlet>
        </main>
    `,
    styles: [`
    :host {
        height: 100%;
        display: block;
        flex-direction: column;
        overflow: hidden;
    }

    header {
        background-color: #fff;
    }
    
    p { margin: 0; padding: 0; }
    
    main {
        height: calc(100% - 80px);
    }    
    `],
    styleUrls: [
        'assets/css/bootstrap.css',
        'assets/css/flex.css'
    ],
    directives: [ROUTER_DIRECTIVES, NavBarComponent],
    providers: [UserManager, UserContext],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Routes([
    {path: '/login',  component: LoginPage},
    {path: '/member', component: MemberHome},
])
export class MainApp {
    private userContext: UserContext;

    constructor(userContext: UserContext) {
        this.userContext = userContext;
        //this.userContext.initialize();
    }

}
