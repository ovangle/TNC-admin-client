import {
    Component, ChangeDetectorRef
} from '@angular/core';

import {Search2} from 'utils/search2';
import {MemberContext} from 'member';

import {Activity} from './activity.model';
import {ActivityManager} from './activity.manager';

@Component({
    selector: 'activity-search-page',
    template: `
    <style>
    :host {
        height: 100%;
        overflow: hidden;
    }  
    </style>
    <activity-search-result-table [search]="search">
    </activity-search-result-table>
    `,
    providers: [
        ActivityManager
    ],
})
export class MemberActivitySearchPage {
    private search: Search2<Activity>;

    constructor(
        private memberContext: MemberContext,
        private activityManager: ActivityManager,
        private _cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.memberContext.member.first().forEach(member => {
            this.search = this.activityManager.getActivitiesForMember(member);
            this._cd.markForCheck();
        });
    }

}
