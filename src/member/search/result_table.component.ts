import {List} from 'immutable';

import {
    Component, Input, ViewEncapsulation, ChangeDetectionStrategy,
    Output, EventEmitter
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
    <ul class="table-body list-unstyled" [csSearch]="search" #result="result">
        <li class="table-row" *ngFor="let item of result.items.toArray()">
            <member-result-table-row
                    [member]="item"
                    (click)="rowClick.emit(item)"
                    [isDropdown]="isDropdown">
            </member-result-table-row>
        </li>
        <li class="table-row loading" *ngIf="result.hasPendingResults">
            <spinner size="1.2rem"></spinner> 
        </li>
    </ul>
    `,
    directives: [MemberResultTableRow, ResultContainer, Spinner],
    styleUrls: [
        '../../../assets/css/bootstrap.css',
        '../../../assets/css/search_result_table.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberSearchResultTable {
    @Input() search: Search<Member>;
    @Input() isDropdown: boolean = false;

    @Output() rowClick = new EventEmitter<Member>();

    bodyScroll() {}
}
