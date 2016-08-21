import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import {EnumSelect2} from '../../../utils/enum';

import {VoucherInput} from '../../voucher';

import {Task} from '../task.model';
import {TASK_TYPE_VALUES} from '../task_type.model';


@Component({
    selector: 'task-input',
    moduleId: module.id,
    templateUrl: './task_input.component.html',
    styleUrls: ['./task_input.component.css'],
    directives: [EnumSelect2, VoucherInput],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskInput {
    private taskTypeValues = TASK_TYPE_VALUES;
    @Input() task: Task;
    @Input() disabled: boolean;

    @Output() taskChange = new EventEmitter<Task>();
    @Output() validityChange = new EventEmitter<boolean>();

    ngOnChanges(changes: any) {
        if (changes.task) {
            console.log('task', this.task);
        }
    }

    propChanged(prop: string, value: any) {
        this.taskChange.emit(
            <Task>this.task.set(prop, value)
        );
    }
}
