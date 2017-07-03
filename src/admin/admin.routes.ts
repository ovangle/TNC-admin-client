import {Route} from '@angular/router';

import {StaffDetails} from './staff/details/staff_details.component';
import {StaffSearchPage} from './staff/staff_search_page.component';
import {StaffCreatePage} from './staff/staff_create_page.component';

export const ADMIN_ROUTES: Route[] = [
    {
        path: 'admin',
        children: [
            {path: '', redirectTo: 'staff', pathMatch: 'full'},
            {path: 'staff', component: StaffSearchPage},
            {path: 'staff/create', component: StaffCreatePage},
            {path: 'staff/:id', component: StaffDetails}
        ]
    }
];
