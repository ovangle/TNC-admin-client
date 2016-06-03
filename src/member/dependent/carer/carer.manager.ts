import {Injectable} from '@angular/core';
import {ManagerBase, ManagerOptions, SearchParameter} from 'caesium-model/manager';
import {Codec, union, JsonObject} from '../../../../../caesium-model/json_codecs';

import {Carer} from './carer.model';
import {MemberCarer} from './member_carer.model';
import {NonMemberPartnerCarer} from './non_member_partner_carer.model';
import {OtherCarer} from './other_carer.model';

@Injectable()
export class CarerManager extends ManagerBase<Carer> {
    getModelType() {
        //TODO (caesium-model): need to support managers of abstract models.
        return Carer;
    }

    getSearchParameters():SearchParameter[] {
        return undefined;
    }

    constructor(options: ManagerOptions) {
        super(options);
    }

    get modelCodec(): Codec<Carer,JsonObject> {
        return union(MemberCarer, NonMemberPartnerCarer, OtherCarer);
    }





}
