import {RouterConfig} from '@angular/router';

import {MemberSearchPage} from './search_page.component';
import {MemberDetailsPage} from './details_page.component';
import {MemberSignupPage} from './signup_page.component';
import {MemberRenewalPage} from './renewal_page.component';

import {MEMBER_DETAIL_ROUTES} from './details/member_details.routes';

export const MEMBER_ROUTES: RouterConfig = [
    {
        path: 'member',
        children: [
            {path: '', component: MemberSearchPage},
            {path: 'signup', component: MemberSignupPage},
            {path: 'renew/:id', component: MemberRenewalPage},
            {path: 'details/:id', component: MemberDetailsPage, children: MEMBER_DETAIL_ROUTES}
        ]
    }
];
