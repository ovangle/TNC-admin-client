import {Observable} from 'rxjs/Observable';
import {Model, ModelBase, RefProperty} from "caesium-model/model";

import {Member} from '../../member.model';
import {MemberManager} from '../../member.manager';
import {Carer} from './carer.model';


@Model({kind: 'dependent::MemberCarer'})
export abstract class MemberCarer extends ModelBase implements Carer {
    @RefProperty({refName: 'member'})
    memberId: number;
    member: Member;

    resolveMember(memberManager: MemberManager): Observable<MemberCarer> {
        return <Observable<MemberCarer>>this.resolveProperty(memberManager, 'member');
    }
}
