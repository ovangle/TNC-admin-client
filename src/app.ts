import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router, RouterLink} from '@angular/router-deprecated';

import {DashboardComponent} from './layout/dashboard.component';
import {UserManager} from './user/user';
import {UserContext} from './user/context.service';
import {LoginPage} from './user/login_page.component';

@Component({
    selector: 'main-app',
    template: `
        <router-outlet></router-outlet>
    `,
    styles: [`
        :host { height: 100%; display: block; }
    `],
    directives: [ROUTER_DIRECTIVES, RouterLink],
    providers: [UserManager, UserContext]
})
@RouteConfig([
    {path: '/', redirectTo: ['Dashboard']},
    {path: '/login', component: LoginPage, as: 'Login'},
    {path: '/dashboard/...', component: DashboardComponent, as: 'Dashboard'}
])
export class MainApp {
    private userContext: UserContext;

    constructor(userContext: UserContext) {
        this.userContext = userContext;
        //this.userContext.initialize();
    }

}
