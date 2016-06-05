import {Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';

import {
    Name, NameInput,
    Gender, GenderSelect,
    Contact, ContactInput,
    Income, IncomeInput
} from '../basic';

import {Partner} from './partner.model';
import {NonMemberPartner} from './non_member_partner.model';

@Component({
    selector: 'non-member-partner-details',
    template: `
    <name-input [label]="'Name'" 
                [disabled]="disabled"
                [name]="partner.name"
                (nameChange)="_nameChanged($event)">
    </name-input>
        
    <gender-select [label]="'Gender'"
                   [disabled]="disabled"
                   [gender]="partner.gender"
                   (genderChange)="_genderChanged($event)">
    </gender-select>
    
    <contact-input
            [contact]="partner.contact"
            (contactChange)="_contactChanged($event)"
            [label]="'Contact'"
            [disabled]="disabled">
    </contact-info>
    
    <income-input 
            [income]="partner.income"
            (incomeChange)="_incomeChanged($event)"
            [label]="'Income'"
            [disabled]="disabled">
    </income-info>
    `,
    directives: [NameInput, GenderSelect, ContactInput, IncomeInput],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NonMemberPartnerDetails {
    @Input() partner: NonMemberPartner;
    @Output() partnerChange = new EventEmitter<Partner>();

    @Input() disabled: boolean;

    _nameChanged(name: Name) {
        this.partnerChange.emit(
            <NonMemberPartner>this.partner.set('name', name)
        );
    }

    _genderChange(gender: Gender) {
        this.partnerChange.emit(
            <NonMemberPartner>this.partner.set('gender', gender)
        );
    }

    _contactChanged(contact: Contact) {
        this.partnerChange.emit(
            <NonMemberPartner>this.partner.set('contact', contact)
        );
    }

    _incomeChanged(income: Income) {
        this.partnerChange.emit(
            <NonMemberPartner>this.partner.set('income', income)
        );
    }
}
