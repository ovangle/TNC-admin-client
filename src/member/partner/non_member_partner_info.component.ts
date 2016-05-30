import {Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy} from 'angular2/core';

import {NonMemberPartner, Partner} from './partner.record';
import {NameInput} from "../basic_info/name_input.component";
import {GenderSelect} from '../basic_info/gender_select.component';
import {Gender} from "../basic_info/gender.enum";
import {ContactInfo} from "../contact/contact_info.record";
import {IncomeInfo} from "../income/income_info.record";

@Component({
    selector: 'non-member-partner-info',
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
    
    <contact-info [contactInfo]="partner.contactInfo"
                  (contactInfoChange)="_contactInfoChanged($event)"
                  [disabled]="disabled">
    </contact-info>
    
    <income-info [incomeInfo]="partner.incomeInfo"
                 (incomeInfoChange)="_incomeInfoChanged($event)"
                 [disabled]="disabled">
    </income-info>
    `,
    directives: [NameInput, GenderSelect],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NonMemberPartnerInfo {
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
            <NonMemberPartner>this.partner.set('contactInfo', contactInfo)
        );
    }

    _incomeInfoChanged(incomeInfo: IncomeInfo) {
        this.partnerChange.emit(
            <NonMemberPartner>this.partner.set('incomeInfo', incomeInfo)
        );

    }
}
