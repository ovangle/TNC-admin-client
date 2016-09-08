import {Observable} from 'rxjs/Observable';
import {List, Map, Set} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import {isBlank} from 'caesium-core/lang';
import {map, str} from 'caesium-model/json_codecs';
import {
    GENDER_VALUES,
    EnergyAccount, EnergyAccountType, ENERGY_ACCOUNT_TYPE_VALUES
} from '../basic';
import {Response as HttpResponse} from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {YesNoSelect} from '../../utils/components/yesno_select.component';
import {DateInput} from '../../utils/date/date_input.component';
import {EnumSelect2} from '../../utils/enum';

import {Member} from '../member.model';
import {MemberManager} from '../member.manager';
import {MemberTermType, MEMBER_TERM_TYPE_SELECT_VALUES} from '../term';
import {
    NameInput, AddressInput, ContactInput, IncomeInput, ResidentialStatusInput,
    EnergyAccountInput
} from '../basic';
import {PartnerInput} from '../partner/partner_input.component';
import {DependentListInput} from '../dependents/dependent_list_input.component'


@Component({
    selector: 'member-input-form',
    moduleId: module.id,
    templateUrl: './member_input.component.html',
    directives: [
        NameInput, DateInput, YesNoSelect, AddressInput, ContactInput, IncomeInput, ResidentialStatusInput,
        PartnerInput, EnumSelect2, ROUTER_DIRECTIVES, EnergyAccountInput,
        DependentListInput
    ],
    styles: [
        require('bootstrap/dist/css/bootstrap.css'),
        require('font-awesome/css/font-awesome.css'),
        require('css/flex.css'),
        require('./member_input.component.css')
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberInputForm {
    private genderValues = GENDER_VALUES;
    private energyAccountTypeValues = ENERGY_ACCOUNT_TYPE_VALUES;
    private termTypeValues = MEMBER_TERM_TYPE_SELECT_VALUES;


    @Input() member: Member;
    /// Model fields to display on the input form.
    @Input() displayFields: Set<string>;

    @Output() commit = new EventEmitter<Member>();
    @Output() cancel = new EventEmitter<any>();

    private errors = Map<string,boolean>({
        name: false,
        partner: true,
        dependents: true
    });

    private get _carers(): List<Member> {
        var carers = [this.member];
        if (!isBlank(this.member.partner)) {
            carers.push(this.member.partner);
        }
        return List<Member>(carers);
    }


    constructor(private memberManager: MemberManager) {}

    get isValid(): boolean {
        return this.errors.valueSeq().every(v => v);
    }

    ngOnInit() {
        if (isBlank(this.member)) {
            this.member = this.memberManager.create(Member, {
                partner: null
            });
        }
        this.errors.set('name', !this.member.name.isAnonymous);
    }

    private propChanged(prop: string, value: any) {
        this.member = <Member>this.member.set(prop, value);
    }

    private propValidityChanged(prop: string, value: boolean) {
        this.errors = this.errors.set(prop, value);
    }

    private termTypeChanged(termType: MemberTermType) {
        var term = this.member.term.set('type', termType);
        this.member = <Member>this.member.set('term', term);
    }

    private energyAccountChanged(acctType: EnergyAccountType, acct: EnergyAccount) {
        let energyAccounts = this.member.energyAccounts.set(acctType, acct);
        this.member = <Member>this.member.set('energyAccounts', energyAccounts);
    }

    save(): Promise<any> {
        let response = this.memberManager.save(this.member);

        return response
            .handle({select: 201, decoder: this.memberManager.modelCodec})
            .forEach(member => {
                this.commit.emit(member);
            })
            .catch((response: HttpResponse) => {
                if (response.status === 400) {
                    return Observable.of<Member>(null);
                }
                return Observable.throw<Member>(response);
            });
    }

    close() {
        this.cancel.emit(true);
    }

    displayField(prop: string): boolean {
        //console.log('display field: ', prop, this.displayFields.contains(prop));
        if (isBlank(this.displayFields)) {
            return true;
        }
        return this.displayFields.contains(prop);
    }

}
