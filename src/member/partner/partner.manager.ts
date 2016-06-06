import {Injectable} from '@angular/core';

import {Codec} from 'caesium-core/codec';

import {ModelMetadata} from 'caesium-model/model/metadata';
import {createModelFactory} from 'caesium-model/model/factory';
import {union, JsonObject} from 'caesium-model/json_codecs';
import {ManagerBase, ManagerOptions, SearchParameter} from "caesium-model/manager";

import {Partner} from './partner.model';
import {NonMemberPartner} from './non_member_partner';
import {MemberPartner} from './member_partner';

@Injectable()
export class PartnerManager extends ManagerBase<Partner> {
    constructor(options: ManagerOptions) {
        super(options);
    }

    get modelCodec(): Codec<Partner,JsonObject> {
        return union(NonMemberPartner, MemberPartner);
    }

    getModelType() { return Partner; }
    getModelSubtypes() { return [MemberPartner, NonMemberPartner]; }

    getSearchParameters():SearchParameter[] { return undefined; }

}

