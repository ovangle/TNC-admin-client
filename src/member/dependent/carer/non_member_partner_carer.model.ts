import {Observable} from 'rxjs/Observable';
import {Model, ModelBase, RefProperty} from "caesium-model/model";

import {NonMemberPartner} from '../../partner/non_member_partner.model';
import {PartnerManager} from '../../partner/partner.manager';

import {Carer} from './carer.model';

/**
 * A non-member partner carer represents a carer who is a direct relation
 * to a dependent, but who
 */
@Model({kind: 'dependent::NonMemberPartnerCarer', superType: Carer})
export abstract class NonMemberPartnerCarer extends Carer {
    @RefProperty({refName: 'partner'})
    partnerId: number;
    partner: NonMemberPartner;

    resolvePartner(partnerManager: PartnerManager): Observable<NonMemberPartnerCarer> {
        return this.resolveProperty(partnerManager, 'partner', {});
    }
}
