import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {List, Map} from 'immutable';

import {Component, ViewEncapsulation, EventEmitter} from "@angular/core";
import {Response as HttpResponse} from '@angular/http';

import {map, str} from 'caesium-model/json_codecs';

import {PageHeader} from '../layout/page_header.component';

import {DateInput} from '../utils/date/date_input.component';
import {YesNoSelect} from "../utils/components/yesno_select.component";
import {ModalDialog, ModalDialogService} from '../utils/modal_dialog';

import {
    NameInput, GenderSelect, AddressInput, ContactInput,
    IncomeInput, ResidentialStatusInput
} from './basic';
import {MemberTermType, MemberTermTypeSelect} from './term';

import {MemberManager} from './member.manager';
import {Member} from './member.model';

@Component({
    selector: 'member-signup',
    template: `
    <div class="container">
        <page-header title="Member signup">
            <button [disabled]="!isValid" (click)="save()">
                <i class="fa fa-save"></i>
                Save
            </icon-button>
        </page-header>
        <div class="input-container">
            <div class="row">
                <member-term-type-select  
                        class="col-sm-4"
                        [termType]="member.term.type"
                        (termTypeChange)="termTypeChanged($event)"
                        [label]="'Membership type'"
                        [required]="true">
                </member-term-type-select>
            </div>
            <div class="row">
                <name-input class="col-sm-12"
                            [name]="member.name"
                            (nameChange)="propChanged('name', $event)" 
                            (validityChange)="propValidityChanged('name', $event)">
                </name-input>
            </div>  
           
            <div class="row">
                <gender-select  
                        class="col-sm-4"
                        [label]="'Gender'"
                        [gender]="member.gender"
                        (genderChange)="propChanged('gender', $event)"></gender-select>
                        
                <date-input class="col-sm-4"
                            [label]="'Date of Birth'" 
                            [date]="member.dateOfBirth"
                            (dateChange)="propChanged('dateOfBirth', $event)"
                            (validityChange)="propValidityChanged('dateOfBirth', $event)"
                            [defaultToday]="false"
                            [required]="true">
                </date-input>
                
                <yesno-select class="col-sm-4"
                              [value]="member.aboriginalOrTorresStraitIslander"
                              (valueChange)="propChanged('aboriginalOrTorresStraitIslander', $event)"
                              [label]="'Aboriginal/Torres Strait Islander'"
                              [disabled]="disabled"></yesno-select>
            </div>                
            
             
            <div class="row">
                <address-input class="col-sm-12"
                               [address]="member.address"           
                               (addressChange)="propChanged('address', $event)"
                               [label]="'Address'"
                               [disabled]="disabled">
                </address-input>
            </div>
            
            <div class="row">
                <contact-input class="col-sm-12"
                               [contact]="member.contact"
                               (contactChange)="propChanged('contact', $event)"
                               [label]="'Contact'"
                               [disabled]="disabled">
                </contact-input>
            </div>
            
            <div class="row">
                <income-input class="col-sm-12"
                              [income]="member.income"
                              (incomeChange)="propChanged('income', $event)"
                              [label]="'Income'"
                              [disabled]="disabled">
                </income-input>
            </div>
            
            <div class="row">
                <residential-status-input 
                        class="col-sm-12"
                        [residentialStatus]="member.residentialStatus"
                        (residentialStatusChange)="propChanged('residentialStatus', $event)"
                        [label]="'Residential Status'"
                        [disabled]="disabled">
                </residential-status-input>
            </div>
            
            <div class="row">
                <partner-details
                    [partner]="member.partner"
                    (partnerChange)="propChanged('partner', $event)">
                </partner-details>
            </div>
        </div>
    </div>    
    `,
    styles: [`
    :host {
        display: block;
        height: 100%;
    }    
    .container {
        height: 100%;
    }    
    .input-container {
        height: calc(100% - 140px);
        overflow: auto;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    
    .page-header > h1 {
        display: inline-block;
    }
    
    .page-header > .btn-group {
        float: right;
    }
    
    `],
    styleUrls: [
        'assets/css/font-awesome.css',
        'assets/css/bootstrap.css'
    ],
    directives: [
        PageHeader, IconButton,
        NameInput, GenderSelect, DateInput, YesNoSelect,
        AddressInput, ContactInput, MemberTermTypeSelect,
        IncomeInput, ResidentialStatusInput
    ],
    providers: [
        MemberManager
    ],
    encapsulation: ViewEncapsulation.Native
})
export class MemberSignupComponent {

    member: Member;
    errors : Map<string,string>;

    private _propValidity = Map<string,boolean>({
        name: false,
        dateOfBirth: false
    });

    get isValid() {
        return this._propValidity.valueSeq().every((v) => v);
    }

    constructor(
        private memberManager: MemberManager,
        private modalDialog: ModalDialogService
    ) { }

    ngOnInit() {
        this.member = this.memberManager.create(Member, {});
    }

    private propChanged(prop: string, value: any) {
        this.member = <Member>this.member.set(prop, value);
    }

    private propValidityChanged(prop: string, validity: boolean) {
        console.log('Property ', prop,  'validity: ', validity);
        this._propValidity = this._propValidity.set(prop, validity);
    }

    private termTypeChanged(termType: MemberTermType) {
        var term = this.member.term.set('type', termType);
        this.member = <Member>this.member.set('term', term);
    }

    save(): Promise<any> {
        let response = this.memberManager.save(this.member);

        return response
            .handle({select: 201, decoder: this.memberManager.modelCodec})
            .catch((response: HttpResponse) => {
                if (response.status === 400) {
                    this.errors = map(str).decode(response.json());
                    return Observable.of<Member>(null);
                }
                return Observable.throw<Member>(response);
            })
            .forEach((member: Member) => {
                if (member === null)
                    return;
                this.modalDialog.activate(memberCreatedDialog(member));
            });
    }
}

function memberCreatedDialog(member: Member): ModalDialog {
    return {
        title: 'Member created',
        bodyHTML: `
            <p><strong>ID:</strong>${member.id}</p>
            <p><strong>Name:</strong>${member.name}</p>
            <p><strong>Expires:</strong>${member.term.endDate}</p>
             
        `
    }
}

