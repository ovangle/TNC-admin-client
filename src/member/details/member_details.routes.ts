import {RouterConfig} from '@angular/router';

import {MemberBasicDetails} from './basic_details.component';
import {MemberFileNotes} from './file_notes.component';
import {MemberActivity} from './activity.component';

import {ACTIVITY_ROUTES} from '../../activity/activity.routes';

export const MEMBER_DETAIL_ROUTES: RouterConfig = [
    {path: '', redirectTo: 'basic', terminal: true},
    {path: 'basic', component: MemberBasicDetails},
    {path: 'filenotes', component: MemberFileNotes},
    {path: 'activity', component: MemberActivity, children: ACTIVITY_ROUTES}
];

