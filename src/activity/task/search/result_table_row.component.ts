import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {NamePipe} from '../../../member/basic';
import {Task} from '../task.model';
import {VoucherDisplay} from '../../voucher/voucher_display.component';

@Component({
    selector: 'task-result-table-row',
    template: `
    <div *ngIf="colHeader">
        <span class="table-cell col-header date-col">Date</span>     
        <span class="table-cell col-header type-col">Type</span>
        <span class="table-cell col-header assessor-col">Assessor</span>
    </div>
    <div *ngIf="!colHeader">
        <div>
           <span class="table-cell date-col">{{task.at | date}}</span>
           <span class="table-cell type-col">{{task.getDisplayType()}}</span>
           <span class="table-cell assessor-col">
                <a [routerLink]="['/admin', 'staff', task.staffId]">{{task.staffName | name}}</a>
           </span>    
           <span class="table-cell view-col">
                <a [routerLink]="['/activity', task.id]">View</a> 
           </span>   
        </div>         
        <voucher-display [voucher]="task.voucher"></voucher-display>
    </div>
    `,
    directives: [VoucherDisplay, ROUTER_DIRECTIVES],
    pipes: [NamePipe],
    styles: [`
    .date-col {
        width: 8rem;
    }    
    .type-col {
        width: 12rem; 
    }    
    .assessor-col {
        width: 15rem;
    }
    `],
    styleUrls: [
        'assets/css/bootstrap.css',
        'assets/css/search_result_table.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskResultTableRow {
    @Input() colHeader: boolean;
    @Input() task: Task;
}
