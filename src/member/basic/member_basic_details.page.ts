import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation
} from '@angular/core';
import {RouteSegment, OnActivate} from '@angular/router';

import {YesNoSelect} from '../../utils/components/yesno_select.component';
import {DateInput} from '../../utils/date/date_input.component';

import {Member} from '../member.model';
import {MemberDetailsPageService} from '../details_page.service';

import {Address, AddressInput} from './address';
import {Contact, ContactInput} from './contact';
import {Name, NameInput} from './name';
import {Gender, GenderSelect} from './gender';
import {ResidentialStatus, ResidentialStatusInput} from './residential_status';
import {Income, IncomeInput} from './income';


/**
 * Member basic details.
 *
 * Subpage of member-details
 */
@Component({
    selector: 'member-basic-details',
    template: `
    <name-input [name]="member.name"
                (nameChange)="_nameChanged($event)"
                [label]="'Name'"
                [disabled]="disabled">
    </name-input> 
                   
    <gender-select [gender]="member.gender"                
                   (genderChange)="_genderChanged($event)"
                   [label]="'Gender'"
                   [disabled]="disabled">
    </gender-select>
    
    <date-input [date]="member.dateOfBirth"
                (dateChange)="_dateOfBirthChanged($event)"
                [label]="'Date of birth'"
                [disabled]="disabled">
    </date-input>
    
    <yesno-select [value]="member.aboriginalOrTorresStraitIslander"
                  (valueChange)="_aboriginalOrTorresStraitIslanderChanged($event)"
                  [label]="'Aboriginal/Torres Strait Islander'"
                  [disabled]="disabled"></yesno-select>
    
    <address-input [address]="member.address"           
                   (addressChange)="_addressChanged($event)"
                   [label]="'Address'"
                   [disabled]="disabled">
    </address-input>
                   
    <residential-status-input
            [residentialStatus]="member.residentialStatus"
            (residentialStatusChange)="_residentialStatusChanged($event)"
            [label]="'Residential status'"
            [disabled]="disabled">
    </residential-status-input>               
    
    <contact-input
            [contact]="member.contact"
            (contactChange)="_contactChanged($event)"
            [label]="'Contact'"
            [disabled]="disabled">
    </contact-input>
    
    <income-input
            [income]="member.income"
            (incomeChange)="_incomeChanged($event)"
            [label]="'Income'"
            [disabled]="disabled"></income-input>
    `,
    directives: [
        NameInput,
        AddressInput,
        GenderSelect,
        ResidentialStatusInput,
        ContactInput,
        IncomeInput,
        DateInput,
        YesNoSelect
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberBasicDetails implements OnActivate {
    member: Member;

    private _memberDetailsPageService: MemberDetailsPageService;
    private _changeDetector: ChangeDetectorRef;

    constructor(memberDetailsPageService: MemberDetailsPageService,
                changeDetector: ChangeDetectorRef) {
        this._memberDetailsPageService = memberDetailsPageService;
        this._changeDetector = changeDetector;
        this.member = memberDetailsPageService._memberManager.create({});
    }

    routerOnActivate(curr: RouteSegment) {
        this._memberDetailsPageService.activePage = MemberBasicDetails;
        this._memberDetailsPageService.getMember().then((member) => {
            this.member = member;
            this._changeDetector.markForCheck();
        })
    }

    _nameChanged(name: Name) {
        this.member = this.member.set('name', name);
    }

    _addressChanged(address: Address) {
        this.member = this.member.set('address', address);
    }

    _genderChanged(gender: Gender) {
        this.member = this.member.set('gender', gender);
    }

    _residentialStatusChanged(residentialStatus: ResidentialStatus) {
        this.member = this.member.set('residentialStatus', residentialStatus);
    }

    _contactChanged(contact: Contact) {
        this.member = this.member.set('contact', contact);
    }

    _incomeChanged(income: Income) {
        this.member = this.member.set('income', income);
    }

    _dateOfBirthChanged(dateOfBirth: Date) {
        this.member = this.member.set('dateOfBirth', dateOfBirth);
    }

    _aboriginalOrTorresStraitIslanderChanged(aboriginalOrTorresStraitIslander: boolean) {
        this.member = this.member.set('aboriginalOrTorresStraitIslander', aboriginalOrTorresStraitIslander);
    }

}
