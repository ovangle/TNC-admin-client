import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, Optional
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {isBlank} from 'caesium-core/lang';

import {PageHeader} from '../../utils/layout/page_header.component';
import {Member, MemberDetailsPage} from '../../member';

import {VoucherManager} from '../voucher';

import {Task} from './task.model';
import {TaskType} from './task_type.model';
import {TaskManager} from './task.manager';
import {TaskInput} from './task_input/task_input.component';


@Component({
    selector: 'display-task-page',
    template: `
    <page-header *ngIf="isAnonymous"
                 [leader]="'New session'"
                 [title]="''"
                 [subtitle]="''">
    </page-header>
    
    <div *ngIf="task">
        <task-input [task]="task" 
                    [disabled]="true"></task-input>
    </div>
    `,
    directives: [PageHeader, TaskInput],
    styleUrls: [
        '../../../assets/css/bootstrap.css',
        '../../../assets/css/font-awesome.css',
        '../../../assets/css/flex.css'
    ],
    providers: [TaskManager, VoucherManager],
    encapsulation: ViewEncapsulation.Native,
})
export class DisplayTaskPage {
    private task: Task;

    get isAnonymous(): boolean {
        return isBlank(this.memberDetailsPage);
    }

    constructor(
        private taskManager: TaskManager,
        private voucherManager: VoucherManager,
        @Optional() private memberDetailsPage: MemberDetailsPage,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.forEach(params => {
            let taskId = +params['id'];
            this.taskManager.getById(taskId).handle({
                select: 200,
                decoder: this.taskManager.modelCodec
            }).forEach(task => {
                this.task = task;
            });
        });

        this.task = this.taskManager.create(Task, {});

        if (!this.isAnonymous) {
            this.memberDetailsPage.member.forEach(member => {
                this.task = <Task>this.task.set('member', member);
            });
        }

        this.route.params.forEach(params => {
            let taskType: TaskType = params['task'];
            this.task = <Task>this.task.set('type', taskType);
            if (taskType === 'ISSUE_VOUCHER') {
                let voucherType = params['voucher'];
                this.task = <Task>this.task.set('voucher', this.voucherManager.create(voucherType, {}));
            }
        });
    }

    save() {
        this.taskManager.save(this.task).forEach(task => {
            this.router.navigate(['..'], {relativeTo: this.route});
        })
    }
}
