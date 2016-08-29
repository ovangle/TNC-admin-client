import {Observable} from 'rxjs/Observable';

import {isBlank} from 'caesium-core/lang';
import {Model, ModelBase, Property, RefProperty} from 'caesium-model/model';
import {list, dateTime} from 'caesium-model/json_codecs';


import {Member, MemberManager} from '../../member';
import {Name, NAME_CODEC} from '../../member/basic';
import {StaffMember, StaffManager} from '../../admin';

import {TaskType, TASK_TYPE_CODEC} from './task_type.model';
import {Voucher, VOUCHER_CODEC} from '../voucher';

@Model({kind: 'activity::Task'})
export class Task extends ModelBase {
    @RefProperty({refName: 'member', refType: Member})
    memberId: number;
    member: Member;

    @RefProperty({refName: 'staff', refType: StaffMember, readOnly: true})
    staffId: number;
    staff: StaffMember;

    @Property({codec: NAME_CODEC, readOnly: true})
    staffName: Name;

    @Property({codec: TASK_TYPE_CODEC, defaultValue: () => 'ISSUE_VOUCHER'})
    type: TaskType;

    @Property({codec: dateTime, readOnly: true})
    at: Date;

    /// Only present if type === 'ISSUE_VOUCHER'
    @Property({codec: VOUCHER_CODEC, required: false})
    voucher: Voucher;

    resolveMember(memberManager: MemberManager): Observable<Task> {
        return <Observable<Task>>this.resolveProperty(memberManager, 'member');
    }

    resolveStaffMember(staffManager: StaffManager): Observable<Task> {
        return <Observable<Task>>this.resolveProperty(staffManager, 'staff');
    }

    getDisplayType(): string {
        switch (this.type) {
            case 'ISSUE_VOUCHER':
                return `Issue ${this.voucher.getDisplayType()} voucher`;
            default:
                throw 'Invalid voucher type: ' + this.type;
        }
    }

    get isValid(): boolean {
        switch (this.type) {
            case 'ISSUE_VOUCHER':
                return this._isIssueVoucherTaskValid();
            default:
                return false;
        }
    }

    private _isIssueVoucherTaskValid(): boolean {
        if (isBlank(this.voucher))
            return false;
        // The member ID cannot be null for a voucher
        if (isBlank(this.memberId))
            return false;
        return this.voucher.isValid;
    }


}
