import {Routes} from '@angular/router';

import {MemberBasicDetails} from './basic_details.component';
import {MemberFileNotes} from './file_notes.component';
import {MemberActivity} from './activity.component';

import {MEMBER_ACTIVITY_ROUTES} from '../../activity/activity.routes';

export const MEMBER_DETAIL_ROUTES: Routes = [
    {path: '', redirectTo: 'basic', pathMatch: 'full'},
    {path: 'basic', component: MemberBasicDetails},
    {path: 'filenotes', component: MemberFileNotes},
    {path: 'activity', component: MemberActivity, children: MEMBER_ACTIVITY_ROUTES}
];

