import {RouterConfig} from '@angular/router';

import {StaffSearch} from './staff/search/staff_search.component';
import {StaffDetails} from './staff/staff_details.component';

export const ADMIN_ROUTES: RouterConfig = [
    {
        path: 'admin',
        children: [
            {path: '', redirectTo: 'staff', terminal: true},
            {path: 'staff', component: StaffSearch},
            {path: 'staff/:id', component: StaffDetails}
        ]
    }
];
