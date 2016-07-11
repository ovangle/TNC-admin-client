import {Injectable} from '@angular/core';

import {Codec} from 'caesium-core/codec';

import {union, JsonObject} from 'caesium-model/json_codecs';
import {ManagerBase, ManagerOptions, SearchParameter} from "caesium-model/manager";

import {ID_SEARCH} from '../../utils/search';
import {NAME_SEARCH} from '../basic';

import {Partner} from './partner.model';
import {NonMemberPartner} from './non_member_partner';
import {MemberPartner} from './member_partner';

@Injectable()
export class PartnerManager extends ManagerBase<Partner> {
    constructor(options: ManagerOptions) {
        super(options);
    }

    getModelType() { return Partner; }
    getModelSubtypes() { return [MemberPartner, NonMemberPartner]; }

    getSearchParameters():SearchParameter[] {
        return [
            NAME_SEARCH
        ];
    }
}

