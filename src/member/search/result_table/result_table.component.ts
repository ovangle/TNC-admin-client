import {List} from 'immutable';

import {
    Component, Input, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef,
    ViewChildren, QueryList, ElementRef, OnInit
} from '@angular/core';
import {Search} from 'caesium-model/manager';

import {ResultContainer} from '../../../utils/search';
import {Spinner} from '../../../utils/spinner/spinner.component';

import {Member} from '../../member.model';
import {MemberResultTableRow} from './result_table_row.component';

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
    host: {'(window:resize)': '_onHostResize($event)'},
    styles: [`
    div.table-body {
        height: calc(100% - 35px); 
        overflow-y: scroll;
    }    
    div.loading {
        background-color: #f8f8f8;
        text-align: center;
        vertical-align: center;
    }
    `],
    styleUrls: [
        'assets/css/bootstrap.css',
        'src/member/search/result_table/result_table.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberSearchResultTable {
    @Input() search: Search<Member>;

    constructor() {
    }
}
