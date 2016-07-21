import {List} from 'immutable';

import {
    Component, Input, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef,
    ViewChildren, QueryList, ElementRef, OnInit
} from '@angular/core';
import {Search} from 'caesium-model/manager';

import {ResultContainer} from '../../utils/search';
import {Spinner} from '../../utils/spinner/spinner.component';

import {Member} from '../member.model';
import {MemberResultTableRow} from './result_table/result_table_row.component';

@Component({
    selector: 'member-search-result-table',

    template: `
    <div class="table-head">
        <member-result-table-row [colHeader]="true">
        </member-result-table-row>
    </div>
    <div class="table-body" (scroll)="bodyScroll($event)">
        <ul class="list-unstyled" [csSearch]="search" #result="result">
            <li class="table-row" *ngFor="let item of result.items.toArray()">
                <member-result-table-row [member]="item">
                </member-result-table-row>
            </li>
        </ul>
        <div class="table-row loading" *ngIf="result.loading">
            <spinner size="1.2rem"></spinner> Loading...
        </div>
    </div>
    `,
    directives: [MemberResultTableRow, ResultContainer, Spinner],
    styleUrls: [
        'assets/css/bootstrap.css',
        'assets/css/search_result_table.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberSearchResultTable {
    @Input() search: Search<Member>;

    bodyScroll() {

    }
}
