import {RouterConfig} from '@angular/router';

import {MemberSearchComponent} from './search/search.component';
import {MemberDetailsComponent} from './details.component';
import {MemberSignupComponent} from './signup.component';
import {PartnerDetails} from './partner';
import {MemberBasicDetails} from './basic';
import {DependentList} from './dependent/dependent_list.page';
import {VoucherList} from './voucher/voucher_list.page';

export const MEMBER_DETAILS_ROUTES: RouterConfig = [
    {path: '', redirectTo: 'basic', terminal: true},
    {path: 'basic', component: MemberBasicDetails},
    {path: 'partner', component: PartnerDetails},
    {path: 'dependents', component: DependentList},
    {path: 'vouchers', component: VoucherList}
];

export const MEMBER_ROUTES: RouterConfig = [
    {
        path: 'member',
        children: [
            {path: '', component: MemberSearchComponent},
            {path: 'signup', component: MemberSignupComponent},
            {path: ':id', component: MemberDetailsComponent, children: MEMBER_DETAILS_ROUTES}
        ]
    }
];
