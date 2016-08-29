import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, Optional,
    ElementRef
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
import {TaskSubmission} from './task_submission.component';


@Component({
    selector: 'create-task-page',
    template: `
    <style>
    .create-task-submit {
        position: fixed; 
        bottom: 10px;
        
        background-color: #ddd;
        padding: 15px;
    }
    .submit-button-container {
        margin-right: 30px;
    }
    </style>
    <page-header *ngIf="isAnonymous"
                 [leader]="'New session'"
                 [title]="''"
                 [subtitle]="''">
    </page-header>
    <div *ngIf="task">
        <task-input [task]="task" 
                    (taskChange)="task = $event">
        </task-input> 
    </div>
    
    <div class="create-task-submit layout horizontal"
         [style.width]="pageWidth.toString() + 'px'">
        <div class="submit-button-container layout vertical center-justified">
            <button 
                class="btn btn-primary"
                (click)="save()" [disabled]="!task.isValid">
                <i class="fa fa-save"></i> Submit
            </button>
        </div>
        <task-submission [task]="task"></task-submission>
    </div> 
    `,
    directives: [PageHeader, TaskInput, TaskSubmission],
    styleUrls: [
        '../../../assets/css/bootstrap.css',
        '../../../assets/css/font-awesome.css',
        '../../../assets/css/flex.css'
    ],
    providers: [VoucherManager, TaskManager],
    encapsulation: ViewEncapsulation.Native,
})
export class CreateTaskPage {
    private task: Task;
    private valid = false;

    get isAnonymous(): boolean {
        return isBlank(this.memberDetailsPage);
    }

    constructor(
        private taskManager: TaskManager,
        private voucherManager: VoucherManager,
        @Optional() private memberDetailsPage: MemberDetailsPage,
        private router: Router,
        private route: ActivatedRoute,
        private elementRef: ElementRef
    ) {}

    get pageWidth(): number {
        return this.elementRef.nativeElement.getBoundingClientRect().width;
    }

    ngOnInit() {
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
        debugger;
        this.taskManager.save(this.task).forEach(task => {
            this.router.navigate(['..'], {relativeTo: this.route});
        })
    }


}
