import moment = require('moment');
import {Observable} from 'rxjs/Observable';

import {Injectable, Pipe, Type} from 'angular2/core';

import {Iterable, List, Set} from 'immutable';

import {isBlank, isDefined} from 'caesium-core/lang';
import {Model, ModelBase, Property, RefProperty} from 'caesium-model/model';
import {ManagerBase, ManagerOptions, ModelHttp, Search, SearchParameter} from 'caesium-model/manager';
import {StateException} from 'caesium-model/exceptions';
import {bool, num, str, date, enumToString, JsonObject} from "caesium-model/json_codecs";

import {AlertLabel, CheckForAlertLabels} from '../utils/alert_label/alert_label';

import {Gender,genderCodec} from './basic_info/gender.enum';
import {Address, addressCodec} from './basic_info/address.record';
import {ResidentialStatus, residentialStatusCodec} from './basic_info/residential_status.record';
import {ContactInfo, contactInfoCodec} from './contact/contact_info.record';
import {IncomeInfo, incomeInfoCodec} from "./income/income_info.record";
import {memberTermCodec, MemberTerm} from "./term/term.record";
import {Partner, NonMemberPartner, nonMemberPartnerCodec, checkForPartnerAlertLabels} from "./partner/partner.record";
import {PartnershipStatus} from './partner/partnership_status_input.component';
import {toStringConverter, identityConverter} from "caesium-core/converter";

@Model({kind: 'member::Member'})
export class Member extends ModelBase
implements CheckForAlertLabels, Partner {
    @Property({codec: str})
    firstName: string;

    @Property({codec: str})
    lastName: string;

    @Property({codec: genderCodec})
    gender: Gender;

    @Property({codec: date})
    dateOfBirth: Date;

    @Property({codec: bool})
    aboriginalOrTorresStraitIslander: boolean;

    @Property({codec: bool, defaultValue: () => false})
    registerConsent: boolean;

    @Property({
        codec: addressCodec,
        defaultValue: () => new Address()
    })
    address: Address;

    @Property({
        codec: residentialStatusCodec,
        defaultValue: () => new ResidentialStatus()
    })
    residentialStatus: ResidentialStatus;

    @Property({
        codec: contactInfoCodec,
        defaultValue: () => new ContactInfo()
    })
    contact: ContactInfo;

    @Property({
        codec: incomeInfoCodec,
        defaultValue: () => new IncomeInfo()
    })
    income: IncomeInfo;

    @Property({
        codec: memberTermCodec,
        defaultValue: () => new MemberTerm()
    })
    term: MemberTerm;

    /**
     * Does the member have a partner? (null === NOT_DISCLOSED)
     */
    @Property({codec: bool, allowNull: true})
    isPartnered: boolean;

    /**
     * The id of the member that is a partner of this member.
     */
    @RefProperty({refName: 'memberPartner'})
    partnerId: number;

    memberPartner: Member;


    //TODO: Need to be able to override the name on the property so that this can be serialized as 'partner'.
    // Then we can have the cleaner serialized output of
    // { ...
    //   partnerId: 13477 (or partner: { <non-member-partner> }
    //   ... }
    @Property({
        codec: nonMemberPartnerCodec,
        defaultValue: () => new NonMemberPartner()
    })
    nonMemberPartner: NonMemberPartner;

    get partner(): Partner {
        return this.nonMemberPartner || this.memberPartner;
    }

    checkForAlertLabels(): Iterable<number, AlertLabel | Iterable<number,any>> {
        var unresolvedLabels = List([
            this.income.checkForAlertLabels(),
            this.contact.checkForAlertLabels(),
            this.residentialStatus.checkForAlertLabels(),
            this.term.checkForAlertLabels()
        ]);
        var resolvedLabels: Iterable<number, AlertLabel | Iterable<number, any>>;
        if (isDefined(this.partner)) {
            resolvedLabels = checkForPartnerAlertLabels(this.partner);
        } else {
            resolvedLabels = List<AlertLabel>();
        }
        return unresolvedLabels.concat(resolvedLabels);
    }

    resolvePartner(memberManager: MemberManager) {
        // TODO: Should not require a literal object to be passed into the function.
        return this.resolveProperty(memberManager, 'partnerId', {});
    }

    set(propName: string, value: any): Member {
        if (propName === 'partner') {
            return this.setPartner(value);
        }
        return <Member>super.set(propName, value);
    }

    /**
     * Set the partner
     * @param partner
     * @returns {Member}
     */
    setPartner(partner: Partner): Member {
        if (isBlank(partner) && this.isPartnered) {
            // We can't automatically set isPartnered -- we don't know whether the member is not partnered
            // or not disclosed.
            throw new StateException('Cannot set \'partner\' to blank value: member.isPartnered is true');
        }

        if (partner instanceof Member) {
            return this
                .set('isPartnered', true)
                .set('memberPartner', partner);
        }
        if (partner instanceof NonMemberPartner) {
            return this
                .set('isPartnered', true)
                .set('nonMemberPartner', partner);
        }

        throw new TypeError(`Not a Member or a NonMemberPartner: ${partner}`);
    }

    get partnershipStatus(): PartnershipStatus {
        var status: PartnershipStatus = {isPartnered: this.isPartnered};
        if (this.isPartnered) {
            status.isMember = !isBlank(this.partnerId);
        }
        return status;
    }

}

export interface MemberName {
    firstName: string;
    lastName: string;
    aliases: Set<string>;
}

function partialNameMatcher(modelValue: MemberName, paramValue: Set<string>): boolean {
    var lowerMemberName = {
        firstName: modelValue.firstName.toLowerCase(),
        lastName: modelValue.lastName.toLowerCase(),
        aliases: modelValue.aliases.map((value) => value.toLowerCase()).toSet()
    }

    var lowercaseParams = paramValue.valueSeq().map((value) => value.toLowerCase());

    return lowercaseParams.every((param) => {
        return lowerMemberName.firstName.includes(param)
            || lowerMemberName.lastName.includes(param)
            || lowerMemberName.aliases.some((alias) => alias.includes(param));
    });
}

function partialNameRefiner(currentParamValue: Set<string>, previousParamValue: Set<string>) {
    var lowerPrevParam = previousParamValue.map((param) => param.toLowerCase()).toSet();
    return currentParamValue
        .map((currentParam) => currentParam.toLowerCase())
        .every((currentParam) => lowerPrevParam.some((prevParam) => currentParam.includes(prevParam)));
}



const _MEMBER_SEARCH_PARAMETERS: SearchParameter[] = [
    {
        name: 'id',
        encoder: identityConverter,
        accessor: (member: Member) => member.id,
        matcher: (modelValue: string|number, paramValue: string) => {
            return modelValue.toString().startsWith(paramValue)
        }
    },
    {
        name: 'name',
        encoder: (nameMatches: Set<string>) => nameMatches.join(','),
        accessor: (member: Member) => ({firstName: member.firstName, lastName: member.lastName, aliases: Set<string>([])}),
        matcher: partialNameMatcher,
        refiner: partialNameRefiner
    }
]

@Injectable()
export class MemberManager extends ManagerBase<Member> {
    constructor(options: ManagerOptions) {
        super(options);
    }

    getModelType(): Type { return Member; }

    getSearchParameters(): SearchParameter[] {
        return [
            // Search based on the initial segements of the id
            {
                name: 'id',
                encoder: identityConverter,
                accessor: (member:Member) => member.id,
                matcher: (modelValue:string|number, paramValue:string) => {
                    return modelValue.toString().startsWith(paramValue)
                }
            },
            // matches a set of components to substrings of the different components of the name.
            {
                name: 'name',
                encoder: (nameMatches:Set<string>) => nameMatches.join(','),
                accessor: (member:Member) => ({
                    firstName: member.firstName,
                    lastName: member.lastName,
                    aliases: Set<string>([])
                }),
                matcher: partialNameMatcher,
                refiner: partialNameRefiner
            }
        ];
    }



}
