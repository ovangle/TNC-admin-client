import {Observable} from 'rxjs/Observable';
import {Model, ModelBase, RefProperty} from "caesium-model/model";

import {Member, MemberManager} from '../../member/member.model';
import {Carer} from './carer.model';


@Model({kind: 'dependent::MemberCarer'})
export abstract class MemberCarer extends ModelBase implements Carer {
    @RefProperty({refName: 'member'})
    memberId: number;
    member: Member;

    resolveMember(memberManager: MemberManager): Observable<MemberCarer> {
        //TODO (caesium-model): resolveProperty needs to be fixed.
        return this.resolveProperty(memberManager, 'member', {});
    }
}
