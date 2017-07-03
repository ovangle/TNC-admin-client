import {
    Component, Input, ChangeDetectionStrategy
} from '@angular/core';

import {Activity} from '../activity.model';


@Component({
    selector: 'activity-result-table-row',
    template: `
    <div>
       <span class="table-cell date-col">{{activity.task.at | date}}</span>
       <span class="table-cell type-col">{{activity.displayType}}</span>
       <span class="table-cell assessor-col">
            <a [routerLink]="['/admin', 'staff', activity.task.staffId]">
                {{activity.task.staffName | name}}
            </a>
       </span>    
       <span class="table-cell value-col" *ngIf="activity.voucher">
             {{activity.voucher.getValue() | money }} 
       </span>
       
    </div>         
    `,
    styleUrls: [
        './result_table_columns.css'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitySearchResultTableRow {
    @Input() colHeader: boolean;
    @Input() activity: Activity;
}
