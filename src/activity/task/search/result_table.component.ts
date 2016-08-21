import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {Search} from 'caesium-model/manager';

import {Spinner} from '../../../utils/spinner/spinner.component';
import {ResultContainer} from '../../../utils/search';
import {Member} from '../../../member';

import {Task} from '../task.model';
import {TaskResultTableRow} from './result_table_row.component';

@Component({
    selector: 'task-search-result-table',
    template: `
    <div class="table-head"> 
        <task-result-table-row [colHeader]="true">
        </task-result-table-row>
    </div>    
    <ul class="table-body list-unstyled" [csSearch]="search" #result="result">
        <li class="table-row" *ngFor="let item of result.items.toArray()">
            <task-result-table-row 
                [member]="member"
                [task]="item"
                (click)="rowClick.emit(item)">
            </task-result-table-row>
        </li>
        <li class="table-row loading" *ngIf="result.hasPendingResults">
            <spinner size="1.2rem"></spinner> 
        </li>
    </ul>
    `,
    directives: [TaskResultTableRow, Spinner, ResultContainer],
    styleUrls: [
        'assets/css/bootstrap.css',
        'assets/css/search_result_table.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskSearchResultTable {
    @Input() search: Search<Task>;

    @Input() member: Member;

    @Output() rowClick = new EventEmitter<Task>();

}
