import {Model, Property, ModelBase} from 'caesium-json/model';
import {Task, TASK_CODEC} from './task';
import {Voucher, VOUCHER_CODEC} from './voucher';


@Model({kind: 'activity::Activity'})
export class Activity extends ModelBase {
    @Property({codec: TASK_CODEC, readOnly: true})
    task: Task;

    @Property({codec: VOUCHER_CODEC, required: false, readOnly: true})
    voucher: Voucher;

    get displayType(): string {
        switch (this.task.type) {
            case 'ISSUE_VOUCHER':
                let voucherType = this.voucher.getDisplayType();
                return `${voucherType} voucher`;
            default:
                throw `Invalid task type: ${this.task.type}`;
        }
    }

}
