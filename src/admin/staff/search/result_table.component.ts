import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ViewChild
} from '@angular/core';

import {Search} from 'caesium-json/manager';
import {ResultContainer} from 'utils/search';
import {StaffMember} from '../staff.model';

@Component({
    selector: 'staff-search-result-table',
    template: `
    <div class="table-head">
        <staff-search-result-table-row [colHeader]="true"></staff-search-result-table-row>
    </div>
    <div class="table-body" (scroll)="bodyScroll($event)">
        <ul class="list-unstyled" [csSearch]="search" #result="result">
            <li class="table-row" *ngFor="let item of result.items.toArray()">
                <staff-search-result-table-row [staffMember]="item"></staff-search-result-table-row> 
            </li>
            <li *ngIf="result.loading" class="table-row">
                <spinner>loading...</spinner> 
            </li>
        </ul>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffSearchResultTable {
    @Input() search: Search<StaffMember>;

    @ViewChild('result') result: ResultContainer<StaffMember>;

    bodyScroll(event: Event) {
        this.result.loadNextResultPage();
    }

    _onHostResize(event: Event) {
        this.result.loadNextResultPage();
    }
}
