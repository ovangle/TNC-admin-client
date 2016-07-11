import {Subject} from 'rxjs/Subject';

import {Injectable} from '@angular/core';

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

    isDirty = false;
    isValid = true;

    member: Member;

    constructor(private memberManager: MemberManager) { }

    setMember(member:Member, isInitialValue:boolean = false) {
        this.member = member;
        this.isDirty = !isInitialValue;
        console.log('context member 2: ', this.member);
    }

    saveMember() {
        throw 'saveMember not implemented';
    }

}
