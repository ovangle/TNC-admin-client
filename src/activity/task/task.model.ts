import {Record} from 'immutable';
import {Observable} from 'rxjs/Observable';

import {num, dateTime, recordCodec} from 'caesium-json/json_codecs';

import {Member, MemberManager} from 'member';
import {Name, NAME_CODEC} from 'member/basic';
import {StaffMember, StaffManager} from 'admin';

import {TaskType, TASK_TYPE_CODEC} from './task_type.model';

const TaskRecord = Record({
    memberId: null,
    member: null,
    staffId: null,
    staff: null,
    staffName: null,
    type: 'ISSUE_VOUCHER',
    at: Date
});

export class Task extends TaskRecord {
    memberId: number;
    member: Member;

    staffId: number;
    staff: StaffMember;

    staffName: Name;

    type: TaskType;

    at: Date;

    resolveMember(memberManager: MemberManager): Observable<Task> {
        if (this.member !== null) {
            return Observable.of(this);
        }
        return memberManager.getById(this.memberId)
            .handle({select: 200, decoder: memberManager.modelCodec})
            .map((member: Member) => <Task>this.set('member', member));
    }

    resolveStaff(staffManager: StaffManager): Observable<Task> {
        if (this.staff !== null) {
            return Observable.of(this);
        }
        return staffManager.getById(this.staffId)
            .handle({select: 200, decoder: staffManager.modelCodec})
            .map((staffMember: StaffMember) => <Task>this.set('staff', staffMember));
    }
}

export const TASK_CODEC = recordCodec({
    staffId: num,
    staffName: NAME_CODEC,
    type: TASK_TYPE_CODEC,
    at: dateTime
}, (args) => new Task(args));

