import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/first';

import {
    Component,
    ChangeDetectionStrategy,
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';


@Component({
    selector: 'member-details-nav',
    template: `
    <ul class="nav nav-pills nav-stacked">
        <li [class.active]="isActivePage('basic') | async">
            <a [routerLink]="['./basic']" >Basic details</a>
        </li>
        <li [class.active]="isActivePage('activity') | async">
            <a [routerLink]="['./activity']">Activity</a>
        </li>
        <li [class.active]="isActivePage('filenotes') | async">
            <a [routerLink]="['./filenotes']">File notes</a>
        </li>
    </ul>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberDetailsNav {
    constructor(private route: ActivatedRoute) {}

    isActivePage(page: string): Observable<boolean> {
        let childUrlSegments = this.route.children
            .map(child => child.url.first());

        return Observable.merge(...childUrlSegments)
            .reduce((acc, urlSegments) => {
                let match = urlSegments
                    .some(segment => segment.path === page);
                return acc || match;
            }, false);
    }
}


