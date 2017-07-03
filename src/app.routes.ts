import {Route} from '@angular/router';

import {ADMIN_ROUTES} from './admin/admin.routes';
import {MEMBER_ROUTES} from './member/member.routes';

import {LoginPage} from './admin/user/login_page.component';

export const APP_ROUTES: Route[] = [
    {path: '', redirectTo: '/member', pathMatch: 'full'},
    ...ADMIN_ROUTES,
    ...MEMBER_ROUTES,
    {path: 'login', component: LoginPage},
    //{path: 'settings', component: UserHomePage}
];

