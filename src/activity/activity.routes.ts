import {Route} from '@angular/router';

import {MemberActivitySearchPage} from './search_page.component';

import {ChemistVoucherAssessmentPage} from './voucher/chemist';
import {EAPAVoucherAssessmentPage} from './voucher/eapa';
import {FoodcareVoucherAssessmentPage} from './voucher/foodcare';

export const MEMBER_ACTIVITY_ROUTES: Route[] = [
    {path: '', component: MemberActivitySearchPage},
    {path: 'voucher', children: [
        {path: 'chemist', children: [
            {path: '', component: ChemistVoucherAssessmentPage},
        ]},
        {path: 'eapa', children: [
            {path: '', component: EAPAVoucherAssessmentPage}
        ]},
        {path: 'foodcare', children: [
            {path: '', component: FoodcareVoucherAssessmentPage}
        ]}
    ]}
];
