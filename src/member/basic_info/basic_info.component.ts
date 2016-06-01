import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ViewEncapsulation} from "@angular/core";

import {forEachOwnProperty} from 'caesium-core/lang';
import {ModelBase} from 'caesium-model/model';

import {DateInput} from '../../utils/date/date_input.component';
import {YesnoSelect} from '../../utils/components/yesno_select.component';

import {Address} from './address.record';
import {AddressInput} from "./address_input.component";
import {Gender} from './gender.enum';
import {GenderSelect} from "./gender_select.component";
import {NameInput} from './name_input.component';
import {ResidentialStatus} from './residential_status.record';
import {ResidentialStatusInput} from "./residential_status_input.component";

export interface MemberBasicInfo extends ModelBase {
    firstName: string;
    lastName: string;
    gender: Gender;
    dateOfBirth: Date;
    aboriginalOrTorresStraitIslander: boolean;
    residentialStatus: ResidentialStatus
    address: Address;
}

@Component({
    selector: 'member-basic-info',
    template: `
        <form>
        
        <div class="form-group">
        <name-input
                [label]="'Name'"
                [name]="_memberName"
                (nameChange)="_nameChange($event)"
                [disabled]="!edit">
        </name-input>
        </div> 
        
        <div class="form-group">
        <address-input 
                [label]="'Address'"
                [address]="member.address" 
                (addressChange)="_addressChange($event)"
                [disabled]="!edit">
        </address-input> 
        </div>
        
        <div class="form-group">
        <gender-select [label]="'Gender'"
                       [gender]="member.gender"
                       (genderChange)="_genderChange($event)"
                       [disabled]="!edit">
        </gender-select>
        </div>
                       
        <div class="form-group">
        <date-input [label]="'Date of birth'"
                    [date]="member.dateOfBirth"
                    (dateChange)="_dateOfBirthChange($event)"
                    [disabled]="!edit">
        </date-input>
        </div>
        
        <div class="form-group">
        <yesno-select [label]="'Aboriginal/Torres Strait Islander'"
                      [value]="member.aboriginalOrTorresStraitIslander"
                      (valueChange)="_aboriginalOrTorresStraitIslanderChange($event)"
                      [disabled]="!edit">
        </yesno-select>
        </div>
        
        
        <div class="form-group">
        <residential-status-input
            [label]="'Residential Status'"
            [residentialStatus]="member.residentialStatus"
            (residentialStatusChange)="_residentialStatusChange($event)"
            [disabled]="!edit">
         </residential-status-input>
         </div>
         </form>
    `,
    directives: [AddressInput, NameInput, GenderSelect, DateInput, YesnoSelect, ResidentialStatusInput],
    styles: [`
    :host { display: block; }    
    `],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberBasicInfoComponent {
    @Input() member: MemberBasicInfo;
    @Output() memberChange = new EventEmitter<MemberBasicInfo>();
    edit: boolean = true;

    get _memberName() {
        return {firstName: this.member.firstName, lastName: this.member.lastName};
    }

    _genderChange(newGender: Gender) {
        this.memberChange.emit(
            <MemberBasicInfo>this.member.set('gender', newGender)
        );
    }

    _dateOfBirthChange(newDate: Date) {
        this.memberChange.emit(
            <MemberBasicInfo>this.member.set('dateOfBirth', newDate)
        );
    }

    _aboriginalOrTorresStraitIslanderChange(newValue: boolean) {
        this.memberChange.emit(
            <MemberBasicInfo>this.member.set('aboriginalOrTorresStraitIslander', newValue)
        );
    }

    _residentialStatusChange(newValue: ResidentialStatus) {
        this.memberChange.emit(
            <MemberBasicInfo>this.member.set('residentialStatus', newValue)
        );
    }

    _addressChange(newValue: Address) {
        this.memberChange.emit(
            <MemberBasicInfo>this.member.set('address', newValue)
        );
    }

    _nameChange(newValue: {firstName: string, lastName: string}) {
        var member = this.member.set('firstName', newValue.firstName);
        this.memberChange.emit(
            <MemberBasicInfo>member.set('lastName', newValue.lastName)
        );
    }

}
