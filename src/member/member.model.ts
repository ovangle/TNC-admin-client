import moment = require('moment');
import {Observable} from 'rxjs'

import {Iterable, List} from 'immutable';

import {isDefined} from 'caesium-core/lang';
import {Model, ModelBase, Property, RefProperty} from 'caesium-model/model';
import {bool, date} from "caesium-model/json_codecs";

import {AlertLabel, CheckForAlertLabels} from '../utils/alert_label/alert_label';

import {
    Name, NAME_CODEC,
    Gender, GENDER_CODEC,
    Address, ADDRESS_CODEC,
    ResidentialStatus, RESIDENTIAL_STATUS_CODEC,
    Contact, CONTACT_CODEC,
    Income, INCOME_CODEC,
    EnergyAccount, ENERGY_ACCOUNT_CODEC
} from './basic';
import {Carer, CarerManager} from './carer';
import {Partner, PartnerManager} from './partner';

import {MEMBER_TERM_CODEC, MemberTerm} from "./term/term.model";


@Model({kind: 'member::Member'})
export class Member extends ModelBase implements CheckForAlertLabels {
    @Property({codec: NAME_CODEC, defaultValue: () => new Name()})
    name: Name;

    @Property({codec: GENDER_CODEC, defaultValue: () => Gender.NotDisclosed})
    gender: Gender;

    @Property({codec: date})
    dateOfBirth: Date;

    @Property({codec: bool, allowNull: true, defaultValue: () => null})
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
        codec: MEMBER_TERM_CODEC,
        defaultValue: () => new MemberTerm()
    })
    term: MemberTerm;

    /**
     * Does the member have a partner? (null === NOT_DISCLOSED)
     */
    @Property({codec: bool, allowNull: true, defaultValue: () => null})
    isPartnered: boolean;

    @Property({
        codec: ENERGY_ACCOUNT_CODEC,
        defaultValue: () => new EnergyAccount()
    })
    energyAccount: EnergyAccount;

    /**
     * The id of the member that is a partner of this member.
     */
    @RefProperty({refName: 'partner', required: false})
    partnerId: number;
    partner: Partner;

    @RefProperty({refName: 'carer', required: false})
    carerId: number;
    carer: Carer;

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

    resolvePartner(partnerManager: PartnerManager): Observable<Member> {
        return <Observable<Member>>this.resolveProperty(partnerManager, 'partnerId');
    }

    resolveCarer(carerManager: CarerManager): Observable<Member> {
        return <Observable<Member>>this.resolveProperty(carerManager, 'carerId');
    }

    set(propName: string, value: any): Member {
        return <Member>super.set(propName, value);
    }
}

