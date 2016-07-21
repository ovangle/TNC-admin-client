import {RouterConfig} from '@angular/router';

import {MemberSearchPage} from './search_page.component';
import {MemberDetailsComponent} from './details.component';
import {MemberSignupPage} from './signup_page.component';
import {PartnerDetails} from './partner';
import {MemberBasicDetails} from './basic';
import {MemberFileNotes} from './file_notes/file_notes.page';
import {DependentList} from './dependent/dependent_list.page';
import {VoucherList} from './voucher/voucher_list.page';

export const MEMBER_DETAILS_ROUTES: RouterConfig = [
    {path: '', redirectTo: 'basic', terminal: true},
    {path: 'basic', component: MemberBasicDetails},
    {path: 'filenotes', component: MemberFileNotes},
    {path: 'partner', component: PartnerDetails},
    {path: 'dependents', component: DependentList},
    {path: 'vouchers', component: VoucherList}
];

export const MEMBER_ROUTES: RouterConfig = [
    {
        path: 'member',
        children: [
            {path: '', component: MemberSearchPage},
            {path: 'signup', component: MemberSignupPage},
            {path: ':id', component: MemberDetailsComponent, children: MEMBER_DETAILS_ROUTES}
        ]
    }
];
