import {date} from 'caesium-model/json_codecs';
import {ModelBase, Model, Property, RefProperty} from 'caesium-model/model';

import {User} from '../../admin';
import {Member} from '../member.model';

@Model({kind: 'member.voucher', isAbstract: true})
export abstract class Voucher extends ModelBase {
    /**
     * The member who this voucher is being issued to.
     */
    @RefProperty({refName: 'member'})
    memberId: number;
    member: Member;

    /**
     * The user who signed this voucher
     */
    @RefProperty({refName: 'user'})
    userId: number;
    user: User;

    /**
     * The date that this voucher was issued
     */
    @Property({codec: date})
    dateOfIssue: Date;
}
