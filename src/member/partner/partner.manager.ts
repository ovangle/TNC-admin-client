import {Injectable} from '@angular/core';

import {Codec} from 'caesium-core/codec';

import {ModelMetadata} from 'caesium-model/model/metadata';
import {createModelFactory} from 'caesium-model/model/factory';
import {union, JsonObject} from 'caesium-model/json_codecs';
import {ManagerBase, ManagerOptions, SearchParameter} from "caesium-model/manager";

import {Partner} from './partner.model';
import {NonMemberPartner} from './non_member_partner.model';
import {MemberPartner} from './member_partner.model';

//TODO (caesium-model): Need to support abstract models.

@Injectable()
export class PartnerManager extends ManagerBase<Partner> {
    constructor(options: ManagerOptions) {
        super(options);
    } 
    
    get modelCodec(): Codec<Partner,JsonObject> {
        return union(NonMemberPartner, MemberPartner);
    }

    getModelType() { return Partner; }

    getSearchParameters():SearchParameter[] {
        return undefined;
    }

    create(args: {[propName: string]:any}) {
        var factory: any;
        if (args['member'] || args['memberId']) {
            factory = createModelFactory(ModelMetadata.forType(MemberPartner));
        } else {
            factory = createModelFactory(ModelMetadata.forType(NonMemberPartner))
        }
        return factory(args);

    }
}

