import {RouterConfig} from '@angular/router';

import {CreateTaskPage} from './task/create_page.component';
import {TaskSearchPage} from './task/search_page.component';
import {DisplayTaskPage} from './task/display_page.component';

export const ACTIVITY_ROUTES: RouterConfig = [
    {path: '', component: TaskSearchPage},
    {path: 'create', component: CreateTaskPage},
    {path: ':id', component: DisplayTaskPage}
];
