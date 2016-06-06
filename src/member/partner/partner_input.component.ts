import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import {
    Contact, ContactInput,
    Income, IncomeInput,
    Name, NameInput,
    Gender, GenderSelect
} from '../basic';

import {Partner} from './partner.model';

@Component({
    selector: 'partner-input',
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
        
        <contact-input [label]="'Contact'"
                       [disabled]="disabled"
                       [contact]="partner.contact"
                       (contactChange)="_contactChanged($event)">
        </contact-input>
        
        <income-input [label]="'Income'"
                      [disabled]="disabled"
                      [income]="partner.income"
                      (incomeChange)="_incomeChanged($event)">
        </income-input>
    `,
    directives: [NameInput, ContactInput, IncomeInput, GenderSelect],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerInput {
    @Input() partner: Partner;
    @Output() partnerChange = new EventEmitter<Partner>();

    @Input() disabled: boolean;

    _nameChanged(name: Name) {
        this.partnerChange.emit(
            <Partner>this.partner.set('name', name)
        );
    }

    _genderChanged(gender: Gender) {
        this.partnerChange.emit(
            <Partner>this.partner.set('gender', gender)
        );
    }

    _contactChanged(contact: Contact) {
        this.partnerChange.emit(
            <Partner>this.partner.set('contact', contact)
        );
    }

    _incomeChanged(income: Income) {
        this.partnerChange.emit(
            <Partner>this.partner.set('income', income)
        );
    }

}
