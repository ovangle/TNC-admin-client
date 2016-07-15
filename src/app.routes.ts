import {provideRouter, RouterConfig} from '@angular/router';

import {ADMIN_ROUTES} from './admin/admin.routes';
import {MEMBER_ROUTES} from './member/member.routes';

import {LoginPage} from './admin/user/login_page.component';
import {UserHomePage} from './admin/user/home_page.component';

export const APP_ROUTES: RouterConfig = [
    {path: '', redirectTo: '/member', terminal: true},
    ...ADMIN_ROUTES,
    ...MEMBER_ROUTES,
    {path: 'login', component: LoginPage},
    {path: 'settings', component: UserHomePage}
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(APP_ROUTES)
];
