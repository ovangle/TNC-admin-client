import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
    ChangeDetectorRef,
    SimpleChange
} from '@angular/core';

import {Search2} from 'utils/search2';

import {Activity} from '../activity.model';

@Component({
    selector: 'activity-search-result-table',
    template: `
    <style>
    :host, div[scrollContainer] {
        height: 100%;
    }
    
    </style>
    <div class="table-head"> 
        <activity-result-table-row-headers></activity-result-table-row-headers>
    </div>
    <div scrollContainer (scrollBottom)="search?.loadNextPage()">
        <ul scrollContent class="list-unstyled">
            <li *ngFor="let item of search?.items$ | async">
                <activity-result-table-row 
                    [activity]="item"
                    (click)="rowClick.emit(item)">
                </activity-result-table-row>
            </li>
        </ul>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitySearchResultTable {
    @Input('search') search: Search2<Activity>;
    @Output() rowClick = new EventEmitter<Activity>();

    constructor(private _cd: ChangeDetectorRef) {}

    ngOnChanges(changes: {[name: string]: SimpleChange}) {
        if (changes['search'] && changes['search'].currentValue) {
            if (changes['search'].previousValue) {
                let oldSearch = changes['search'].previousValue;
                if (oldSearch.complete) {
                    oldSearch.complete();
                }
            }

            let search = changes['search'].currentValue;
            search.items$.subscribe((_: any) => {
                this._cd.markForCheck();
            });
            search.send();
        }
    }

    ngOnDestroy() {
        if (this.search) {
            this.search.complete();
        }
    }


}
