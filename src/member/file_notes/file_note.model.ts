import {Record} from 'immutable';

import {forwardRef} from '@angular/core';

import {dateTime, str, bool} from 'caesium-model/json_codecs';
import {Model, ModelBase, Property, RefProperty} from 'caesium-model/model';


import {StaffMember} from '../../admin/staff/staff.model';
import {Member} from '../member.model';
import {FileNoteSeverity, FILE_NOTE_SEVERITY_CODEC} from './severity';

@Model({kind: 'member.filenote::FileNote'})
export class FileNote extends ModelBase {
    @RefProperty({refName: 'staff', readOnly: true, refType: forwardRef(() => StaffMember)})
    staffId: number;
    staff: StaffMember;

    @RefProperty({refName: 'member', refType: forwardRef(() => Member)})
    memberId: number;
    member: Member;

    @Property({codec: FILE_NOTE_SEVERITY_CODEC, defaultValue: () => 'INFO'})
    severity: FileNoteSeverity;

    @Property({codec: dateTime, readOnly: true})
    created: Date;

    @Property({codec: str})
    message: string;

    @Property({codec: bool, defaultValue: () => false})
    pinned: boolean;

}

