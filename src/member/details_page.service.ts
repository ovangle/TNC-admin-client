import 'rxjs/add/operator/toPromise';

import {Injectable, forwardRef, Inject} from '@angular/core';

import {isDefined, Type} from 'caesium-core/lang';
import {StateException} from 'caesium-model/exceptions';

import {Member} from "./member.model";
import {MemberManager} from './member.manager';

//FIXME: This is pretty ugly. We would like to be able to access the `id` parameter
// from child routes.

/**
 * Shared service which stores the member as we navigate through
 * the pages of the member details.
 *
 * An instance is provided by the member details page.
 * Subpages should obtain the injected instance and access the member
 */
@Injectable()
export class MemberDetailsPageService {
    id: number;
    _memberManager: MemberManager;

    activePage: Type;

    constructor(
        @Inject(forwardRef(() => MemberManager)) memberManager: MemberManager) {
        this._memberManager = memberManager;
    }

    setMemberId(id: number) {
        this.id = id;
    }

    getMember(): Promise<Member> {
        if (!isDefined(this.id)) {
            throw new StateException('No member ID set');
        }
        return this._memberManager.getById(this.id)
            .handle({select: 200, decoder: this._memberManager.modelCodec})
            .toPromise();
    }
}
