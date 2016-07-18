import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {List, Map} from 'immutable';

import {
    Component, ViewEncapsulation, Input, EventEmitter, ChangeDetectionStrategy,
    ViewContainerRef, Output, ComponentRef
} from "@angular/core";
import {Response as HttpResponse} from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router';


import {map, str} from 'caesium-model/json_codecs';

import {EnumSelect2} from '../utils/enum';
import {PageHeader} from '../utils/layout/page_header.component';

import {RemoteComponent} from '../utils/component_host';
import {DateInput} from '../utils/date/date_input.component';
import {YesNoSelect} from "../utils/components/yesno_select.component";
import {Modal} from '../utils/modal';

import {
    Name, NamePipe, NameInput,
    GENDER_VALUES, AddressInput, ContactInput,
    IncomeInput, ResidentialStatusInput,
} from './basic';
import {MemberTermType, MemberTermTypeSelect} from './term';

import {MemberManager} from './member.manager';
import {Member} from './member.model';

@Component({
    template: `
        <p><strong>Name:</strong>{{name | name}}</p>
        <button (click)="click.emit($event)">Click me</button>
   `,
    pipes: [NamePipe]
})
export class MemberCreatedDialog {
    @Input() name: Name;
    @Output() click = new EventEmitter<boolean>();
}

@Component({
    selector: 'member-signup',
    template: `
    <div class="container">
        <page-header title="Member signup">
            <div class="btn-group">
            <button class="btn btn-primary" [disabled]="!isValid" (click)="save()">
                <i class="fa fa-save"></i>
                Save
            </button>
            <a class="btn" [routerLink]="['..']">
                <i class="fa fa-close"></i>
                Close
            </a>    
            </div>
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
                <enum-select2
                        class="col-sm-4"
                        [label]="'Gender'" 
                        [enumValues]="genderValues"
                        [value]="member.gender"
                        (valueChange)="propChanged('gender', $event)"></enum-select2>
                        
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
        PageHeader,
        NameInput, DateInput, YesNoSelect,
        AddressInput, ContactInput, MemberTermTypeSelect,
        IncomeInput, ResidentialStatusInput,
        EnumSelect2,
        ROUTER_DIRECTIVES
    ],
    providers: [
        MemberManager
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberSignupComponent {
    private genderValues = GENDER_VALUES;

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
        private modal: Modal,
        private vcRef: ViewContainerRef
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
            });
    }

}


