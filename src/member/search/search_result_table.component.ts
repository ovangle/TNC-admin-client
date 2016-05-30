import {List} from 'immutable';

import {Component, Input, ViewEncapsulation, ChangeDetectionStrategy} from 'angular2/core';
import {SearchResult} from 'caesium-model/manager';

import {Member} from '../member.model';
import {MemberResultTableRow} from './result_table/row.component';

@Component({
    selector: 'search-result-table',
    template: `
    <div class="table-head">
        <member-result-table-row [colHeader]="true">
        </member-result-table-row>
    </div>
    <div class="table-body">
        <ul class="list-unstyled">
            <li class="table-row" *ngFor="#item of responseItems">
                <member-result-table-row 
                        [item]="item">
                </member-result-table-row>
            </li>
        </ul>
    </div>
    `,
    directives: [MemberResultTableRow],
    styles: [`
    :host {
        height: 100%;
        display: block;
    }    
    `],
    styleUrls: [
        'assets/css/bootstrap.css',
        'src/member/search/result_table/result_table.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultTable {
    @Input() result: SearchResult<Member>;

    get responseItems(): List<Member> {
        return this.result ? this.result.items : List<Member>();
    }

}
