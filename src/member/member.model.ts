import moment = require('moment');

import {Injectable, Pipe, Type} from '@angular/core';

import {Iterable, List, Set} from 'immutable';

import {isDefined} from 'caesium-core/lang';
import {identityConverter} from "caesium-core/converter";
import {Model, ModelBase, Property, RefProperty} from 'caesium-model/model';
import {ManagerBase, ManagerOptions, ModelHttp, Search, SearchParameter} from 'caesium-model/manager';
import {StateException} from 'caesium-model/exceptions';
import {bool, num, str, date, enumToString, JsonObject} from "caesium-model/json_codecs";

import {AlertLabel, CheckForAlertLabels} from '../utils/alert_label/alert_label';

import {Partner} from 'partner/partner.model';
import {PartnerManager} from 'partner/partner.manager';

import {Gender,genderCodec} from './basic_info/gender.enum';
import {Address, addressCodec} from './basic_info/address.record';
import {ResidentialStatus, residentialStatusCodec} from './basic_info/residential_status.record';
import {ContactInfo, contactInfoCodec} from './contact/contact_info.record';
import {IncomeInfo, incomeInfoCodec} from "./income/income_info.record";
import {memberTermCodec, MemberTerm} from "./term/term.record";


@Model({kind: 'member::Member'})
export class Member extends ModelBase implements CheckForAlertLabels {
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
    @RefProperty({refName: 'partner'})
    partnerId: number;

    partner: Partner;

    checkForAlertLabels(): Iterable<number, AlertLabel | Iterable<number,any>> {
        var unresolvedLabels = List([
            this.income.checkForAlertLabels(),
            this.contact.checkForAlertLabels(),
            this.residentialStatus.checkForAlertLabels(),
            this.term.checkForAlertLabels()
        ]);
        var resolvedLabels: Iterable<number, AlertLabel | Iterable<number, any>>;
        if (isDefined(this.partner)) {
            resolvedLabels = this.partner.checkForAlertLabels();
        } else {
            resolvedLabels = List<AlertLabel>();
        }
        return unresolvedLabels.concat(resolvedLabels);
    }

    resolvePartner(partnerManager: PartnerManager) {
        // TODO: Should not require a literal object to be passed into the function.
        return this.resolveProperty(partnerManager, 'partnerId', {});
    }

    set(propName: string, value: any): Member {
        return <Member>super.set(propName, value);
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
    }

    console.log('partialNameMatcher');
    console.log('\tlower member name: ', JSON.stringify(lowerMemberName));

    var lowercaseParams = paramValue.valueSeq().map((value) => value.toLowerCase());

    console.log('\tparams', lowercaseParams.toArray())

    var match = lowercaseParams.every((param) => {
        return lowerMemberName.firstName.includes(param)
            || lowerMemberName.lastName.includes(param)
    });
    console.log('\tis match: ', match);
    return match;
}

function partialNameRefiner(previousParamValue: Set<string>, currentParamValue: Set<string>) {

    var lowerCurrParam = currentParamValue.map((param) => param.toLowerCase()).toSet();
    var lowerPrevParam = previousParamValue.map((param) => param.toLowerCase()).toSet();

    function partialNameComponentRefiner(curr:string):boolean {
        return lowerPrevParam.contains(curr)
            || lowerPrevParam.some((prevParam) => prevParam.includes(curr));
    }

    return lowerCurrParam
        .every((currParam) => partialNameComponentRefiner(currParam));
}


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
                }),
                matcher: partialNameMatcher,
                refiner: partialNameRefiner
            }
        ];
    }



}
