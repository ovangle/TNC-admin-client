import moment = require('moment');

import {Injectable, Pipe, Type} from '@angular/core';

import {Iterable, List, Set} from 'immutable';

import {isDefined} from 'caesium-core/lang';
import {identityConverter} from "caesium-core/converter";
import {Model, ModelBase, Property, RefProperty} from 'caesium-model/model';
import {ManagerBase, ManagerOptions, ModelHttp, Search, SearchParameter} from 'caesium-model/manager';
import {bool, date} from "caesium-model/json_codecs";

import {AlertLabel, CheckForAlertLabels} from '../utils/alert_label/alert_label';

import {Partner} from './partner/partner.model';
import {PartnerManager} from './partner/partner.manager';

import {
    Name, NAME_CODEC,
    Gender, GENDER_CODEC,
    Address, ADDRESS_CODEC,
    ResidentialStatus, RESIDENTIAL_STATUS_CODEC,
    Contact, CONTACT_CODEC,
    Income, INCOME_CODEC
} from './basic';

import {memberTermCodec, MemberTerm} from "./term/term.record";


@Model({kind: 'member::Member'})
export class Member extends ModelBase implements CheckForAlertLabels {
    @Property({codec: NAME_CODEC, defaultValue: () => new Name()})
    name: Name;

    @Property({codec: GENDER_CODEC})
    gender: Gender;

    @Property({codec: date})
    dateOfBirth: Date;

    @Property({codec: bool})
    aboriginalOrTorresStraitIslander: boolean;

    @Property({codec: bool, defaultValue: () => false})
    registerConsent: boolean;

    @Property({
        codec: ADDRESS_CODEC,
        defaultValue: () => new Address()
    })
    address: Address;

    @Property({
        codec: RESIDENTIAL_STATUS_CODEC,
        defaultValue: () => new ResidentialStatus()
    })
    residentialStatus: ResidentialStatus;

    @Property({
        codec: CONTACT_CODEC,
        defaultValue: () => new Contact()
    })
    contact: Contact;

    @Property({
        codec: INCOME_CODEC,
        defaultValue: () => new Income()
    })
    income: Income;

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

