import {Subscription} from 'rxjs/Subscription';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation
} from '@angular/core';

import {YesNoSelect} from '../../utils/components/yesno_select.component';
import {DateInput} from '../../utils/date/date_input.component';

import {Member} from '../member.model';
import {MemberContext} from '../details_context.service';
import {MemberManager} from '../member.manager';

import {Address, AddressInput} from './address';
import {Contact, ContactInput} from './contact';
import {Name, NameInput} from './name';
import {Gender, GenderSelect} from './gender';
import {ResidentialStatus, ResidentialStatusInput} from './residential_status';
import {Income, IncomeInput} from './income';
import {EnergyAccount, EnergyAccountInput} from './energy_account';

/**
 * Member basic details.
 *
 * Subpage of member-details
 */
@Component({
    selector: 'member-basic-details',
    template: `
    <name-input [name]="member.name"
                (nameChange)="propChanged('name', $event)"
                [label]="'Name'"
                [disabled]="disabled">
    </name-input> 
                   
    <gender-select [gender]="member.gender"                
                   (genderChange)="propChanged('gender', $event)"
                   [label]="'Gender'"
                   [disabled]="disabled">
    </gender-select>
    
    <date-input [date]="member.dateOfBirth"
                (dateChange)="propChanged('dateOfBirth', $event)"
                [defaultToday]="false"
                [label]="'Date of birth'"
                [disabled]="disabled">
    </date-input>
    
    <yesno-select [value]="member.aboriginalOrTorresStraitIslander"
                  (valueChange)="propChanged('aboriginalOrTorresStraitIslander', $event)"
                  [label]="'Aboriginal/Torres Strait Islander'"
                  [disabled]="disabled"></yesno-select>
    
    <address-input [address]="member.address"           
                   (addressChange)="propChanged('address', $event)"
                   [label]="'Address'"
                   [disabled]="disabled">
    </address-input>
    
    <contact-input
            [contact]="member.contact"
            (contactChange)="propChanged('contact', $event)"
            [label]="'Contact'"
            [disabled]="disabled">
    </contact-input>
                   
    <residential-status-input
            [residentialStatus]="member.residentialStatus"
            (residentialStatusChange)="propChanged('residentialStatus', $event)"
            [label]="'Residential status'"
            [disabled]="disabled">
    </residential-status-input>               
    
    <income-input
            [income]="member.income"
            (incomeChange)="propChanged('income', $event)"
            [label]="'Income'"
            [disabled]="disabled"></income-input>
            
    <energy-account-input
            [energyAccount]="member.energyAccount"
            (energyAccountChange)="propChanged('energyAccount', $event)"
            [label]="'Energy account'"
            [disabled]="disabled">
    </energy-account-input>
    `,
    directives: [
        NameInput,
        AddressInput,
        GenderSelect,
        EnergyAccountInput,
        ResidentialStatusInput,
        ContactInput,
        IncomeInput,
        DateInput,
        YesNoSelect
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberBasicDetails {
    member: Member;

    private memberChange: Subscription;

    constructor(private memberManager: MemberManager,
                private changeDetector: ChangeDetectorRef,
                private context: MemberContext
    ) {
        this.member = memberManager.create(Member, {});
    }

    ngOnInit() {
        this.context.activePage = MemberBasicDetails;
        this.memberChange = this.context.memberChange
            .subscribe(member => {
                this.member = member;
                this.changeDetector.markForCheck();
            });
    }

    ngOnDestroy() {
        if (!this.memberChange.isUnsubscribed) {
            this.memberChange.unsubscribe();
        }
    }

    propChanged(prop: string, value: any) {
        this.member = this.member.set(prop, value);
    }
}
