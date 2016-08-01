import {RouterConfig} from '@angular/router';

import {MemberBasicDetails} from './basic_details.component';
import {MemberFileNotes} from './file_notes.component';

export const MEMBER_DETAIL_ROUTES: RouterConfig = [
    {path: '', redirectTo: 'basic', terminal: true},
    {path: 'basic', component: MemberBasicDetails},
    {path: 'filenotes', component: MemberFileNotes},
];
