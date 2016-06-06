import {Injectable} from '@angular/core';
import {ManagerBase, ManagerOptions, SearchParameter} from 'caesium-model/manager';

import {Carer} from './carer.model';
import {MemberCarer} from './member_carer.model';
import {NonMemberPartnerCarer} from './non_member_partner_carer.model';

@Injectable()
export class CarerManager extends ManagerBase<Carer> {
    getModelType() { return Carer; }
    getModelSubtypes() { return [MemberCarer, NonMemberPartnerCarer]; }
    getSearchParameters():SearchParameter[] { return undefined; }

    constructor(options: ManagerOptions) {
        super(options);
    }
}
