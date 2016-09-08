import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import {Task} from './task.model';

import {IssueVoucherSubmission} from '../voucher/issue_submission.component';

/**
 * The task submission statement contains info relevant to
 * estimating the result of the task,
 */
@Component({
    selector: 'task-submission',
    template: `
    <div [ngSwitch]="task.type">
        <div *ngSwitchCase="'ISSUE_VOUCHER'">
            <issue-voucher-submission [voucher]="task.voucher"></issue-voucher-submission>
        </div>
        <div *ngSwitchDefault>Invalid task type</div>
    </div>
    `,
    directives: [
        IssueVoucherSubmission
    ],
    styles: [
        require('bootstrap/dist/css/bootstrap.css')
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskSubmission {
    @Input() task: Task;
}
