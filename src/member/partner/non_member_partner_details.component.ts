import {Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';

import {NameInput} from "../member/basic_info/name_input.component";
import {GenderSelect} from '../member/basic_info/gender_select.component';
import {Gender} from "../member/basic_info/gender.enum";
import {ContactInfo} from "../member/contact/contact_info.record";
import {IncomeInfo} from "../member/income/income_info.record";
import {IncomeInfoComponent} from '../member/income/income_info.component';
import {ContactInfoComponent} from "../member/contact/contact_info.component";

import {Partner} from './partner.model';
import {NonMemberPartner} from './non_member_partner.model';

@Component({
    selector: 'non-member-partner-details',
    template: `
    <name-input [label]="'Name'" 
                [disabled]="disabled"
                [name]="name"
                (nameChange)="_nameChanged($event)">
    </name-input>
        
    <gender-select [label]="'Gender'"
                   [disabled]="disabled"
                   [gender]="partner.gender"
                   (genderChange)="_genderChanged($event)">
    </gender-select>
    
    <contact-info [contactInfo]="partner.contact"
                  (contactInfoChange)="_contactInfoChanged($event)"
                  [disabled]="disabled">
    </contact-info>
    
    <income-info [incomeInfo]="partner.income"
                 (incomeInfoChange)="_incomeInfoChanged($event)"
                 [disabled]="disabled">
    </income-info>
    `,
    directives: [NameInput, GenderSelect, ContactInfoComponent, IncomeInfoComponent],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NonMemberPartnerDetails {
    @Input() partner: NonMemberPartner;
    @Output() partnerChange = new EventEmitter<Partner>();

    @Input() disabled: boolean;

    get name(): {firstName: string, lastName: string} {
        return {
            firstName: this.partner.firstName,
            lastName: this.partner.lastName
        };
    }

    _nameChanged(name: {firstName: string, lastName: string}) {
        this.partnerChange.emit(
            <NonMemberPartner>this.partner
                .set('firstName', name.firstName)
                .set('lastName', name.lastName)
        )
    }

    _genderChange(gender: Gender) {
        this.partnerChange.emit(
            <NonMemberPartner>this.partner.set('gender', gender)
        );
    }

    _contactInfoChanged(contactInfo: ContactInfo) {
        this.partnerChange.emit(
            <NonMemberPartner>this.partner.set('contact', contactInfo)
        );
    }

    _incomeInfoChanged(incomeInfo: IncomeInfo) {
        this.partnerChange.emit(
            <NonMemberPartner>this.partner.set('income', incomeInfo)
        );

    }
}
