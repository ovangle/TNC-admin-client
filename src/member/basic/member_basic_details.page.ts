import {Subscription} from 'rxjs/Subscription';

import {
    Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation,
    ViewChild
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {isDefined} from 'caesium-core/lang';

import {YesNoSelect} from '../../utils/components/yesno_select.component';
import {DateInput} from '../../utils/date/date_input.component';

import {Member} from '../member.model';
import {MemberContext} from '../details_context.service';
import {MemberManager} from '../member.manager';

import {FileNoteSearch} from '../file_notes/file_note_search.component';

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
    <file-note-search
            [member]="member"
            [pinned]="true">
            
    </file-note-search>

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
    styles: [`
    :host {
        display: block;
        height: 100%;
        overflow-y: auto; 
        padding-right: 1.2rem;
    }
    `],
    directives: [
        NameInput,
        AddressInput,
        GenderSelect,
        EnergyAccountInput,
        ResidentialStatusInput,
        ContactInput,
        IncomeInput,
        DateInput,
        YesNoSelect,
        FileNoteSearch
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberBasicDetails {
    get member(): Member { return this.context.member; }
    set member(member: Member) {
        this.context.setMember(member);
    }

    @ViewChild(FileNoteSearch) fileNotes: FileNoteSearch;

    constructor(private memberManager: MemberManager,
                private changeDetector: ChangeDetectorRef,
                private context: MemberContext,
                private route: ActivatedRoute
    ) {
        this.member = memberManager.create(Member, {});
    }

    ngOnInit() {
        this.route.params.forEach((routeParams: any) => {
            this.context.activePage = MemberBasicDetails;
            if (isDefined(this.fileNotes))
                this.fileNotes.resetSearch();
            this.changeDetector.markForCheck();
        });
    }

    propChanged(prop: string, value: any) {
        this.member = this.member.set(prop, value);
    }
}
