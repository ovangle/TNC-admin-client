import moment = require('moment');
import {Observable} from 'rxjs/Observable';

import {Iterable, List} from 'immutable';

import {isDefined} from 'caesium-core/lang';
import {Model, ModelBase, Property, RefProperty} from 'caesium-model/model';
import {bool, date, model, list} from "caesium-model/json_codecs";

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
import {Carer} from './dependents/carer.model';

import {MEMBER_TERM_CODEC, MemberTerm} from "./term/term.model";
import {Dependent} from './dependents/dependent.model';
import {MemberManager} from './member.manager';


@Model({kind: 'member::Member'})
export class Member extends ModelBase implements CheckForAlertLabels, Carer {
    @Property({codec: NAME_CODEC, defaultValue: () => new Name()})
    name: Name;

    @Property({codec: GENDER_CODEC, defaultValue: () => 'NOT_DISCLOSED'})
    gender: Gender;

    @Property({codec: date, allowNull: true, defaultValue: () => null})
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
    @RefProperty({refName: 'partner', refType: Member, allowNull: true})
    partnerId: number;
    partner: Member;

    @Property({codec: list(model(Dependent)), defaultValue: List})
    dependents: List<Dependent>;


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

    resolvePartner(memberManager: MemberManager): Observable<Member> {
        return <Observable<Member>>this.resolveProperty(memberManager, 'partnerId');
    }


    set(propName: string, value: any): Member {
        return <Member>super.set(propName, value);
    }

    hasValidName(): boolean {
        return !this.name.isAnonymous;
    }


    /// Implementation of carer interface
    isCarerResolved = true;
    resolveCarer(memberManager: MemberManager): Observable<Member> {
        return Observable.of<Member>(this);
    }
}

