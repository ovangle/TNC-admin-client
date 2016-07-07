import {Subject} from 'rxjs/Subject';

import {Injectable, forwardRef, Inject} from '@angular/core';

import {Type} from 'caesium-core/lang';

import {Member} from "./member.model";
import {MemberManager} from './member.manager';

/**
 * Shared service which stores the member as we navigate through
 * the pages of the member details.
 *
 * An instance is provided by the member details page.
 * Subpages should obtain the injected instance and access the member
 */
@Injectable()
export class MemberContext {
    activePage:Type;

    memberChange = new Subject<Member>();

    //TODO: Remove this.
    defaultMember() {
        throw 'NotImplemented: MemberContext.defaultMember()';
    }

    setMember(member:Member, isInitialValue:boolean = false) {
        this.memberChange.next(member);
    }
}
