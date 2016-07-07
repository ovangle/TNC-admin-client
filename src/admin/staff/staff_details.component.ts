import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {Subscription} from 'rxjs/Subscription';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ChangeDetectorRef
} from '@angular/core';
import {ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';

import {DateInput} from '../../utils/date/date_input.component';

import {
    Address, AddressInput,
    Contact, ContactInput,
} from '../../member/basic';

import {StaffTypePipe} from './type';
import {StaffAvailability, StaffAvailabilityInput} from './availability';
import {StaffInductionSurvey, StaffInductionSurveyInput} from './induction_survey';

import {StaffManager} from './staff.manager';
import {StaffMember} from './staff.model';
import {NamePipe} from "../../member/basic/name/name.pipe";

@Component({
    selector: 'staff-details',
    template: `
    <div class="container-fluid" *ngIf="staffMember">
    <div class="page-header"> 
        <h4>{{staffMember.type | staffType}}</h4> 
        <h1>{{staffMember.name | name}}
            <small>{{staffMember.id}}</small>
        </h1>
        <div class="btn-group mutate-controls">
            <button class="btn btn-default" (click)="save()">
                <i class="fa fa-save"></i>Save
            </button>
            <a class="btn btn-danger" [routerLink]="'../admin'">
                <i class="fa fa-close"></i>Close
            </a>
        </div>
    </div>
    <div class="col-md-3">
        <ul class="nav nav-pills nav-stacked">
            <li [ngClass]="{'active': _isMainPageActive}">Basic</li>
        </ul> 
    </div>
    <div class="details-body col-md-9">
        <date-input [label]="'Date of Birth'"
                    [date]="staffMember.dateOfBirth" 
                    (dateChange)="_dateOfBirthChanged($event)"></date-input>
    
        <address-input [label]="'Address'" 
                       [address]="staffMember.address" 
                       (addressChange)="_addressChanged($event)">
        </address-input>
        
        <contact-input [label]="'Contact'"
                       [contact]="staffMember.contact"
                       (contactChange)="_contactChanged($event)">
        </contact-input>
        
        <staff-availability-input          
                [staffType]="staffMember.type"
                [availability]="staffMember.availability"
                (availabilityChange)="_availabilityChanged($event)">
        </staff-availability-input>
        
        <staff-induction-survey-input 
                [staffType]="staffMember.type"
                [survey]="staffMember.inductionSurvey"
                (surveyChange)="_inductionSurveyChanged($event)">
        </staff-induction-survey-input>
    </div>
    </div>
    `,
    directives: [
        AddressInput, ContactInput, DateInput,
        StaffAvailabilityInput, StaffInductionSurveyInput,
        ROUTER_DIRECTIVES
    ],
    pipes: [NamePipe, StaffTypePipe],
    providers: [StaffManager],
    styles: [`
        :host {
            display: block;
            height: 100%;
        }    
        div.container-fluid {
            height: 100%;
        }
        .page-header > h4 {
            color: #999;
        } 
        .page-header > h1 {
            display: inline-block;
        } 
        .details-body {
            overflow: auto;
            height: calc(100% - 178px);
        }    
        .mutate-controls {
            float: right;
        }
    `],
    styleUrls: [
        'assets/css/font-awesome.css',
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffDetails {
    private _routeSubscription: Subscription;

    staffMember: StaffMember;

    constructor(
        private staffManager: StaffManager,
        private route: ActivatedRoute,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this._routeSubscription = this.route.params
            .map(params => Number.parseInt(params['id']))
            .switchMap(id => this.staffManager.getById(id).handle({
                select: 200,
                decoder: this.staffManager.modelCodec
            }))
            .subscribe(staffMember => {
                this.staffMember = staffMember;
                this.changeDetector.markForCheck();
            });
    }

    _isMainPageActive: boolean = true;

    _dateOfBirthChanged(date: Date) {
        this.staffMember = <StaffMember>this.staffMember.set('dateOfBirth', date);
    }

    _addressChanged(address: Address) {
        this.staffMember = <StaffMember>this.staffMember.set('address', address);
    }

    _contactChanged(contact: Contact) {
        this.staffMember = <StaffMember>this.staffMember.set('contact', contact);
    }

    _availabilityChanged(availability: StaffAvailability) {
        this.staffMember = <StaffMember>this.staffMember.set('availability', availability);
    }

    _inductionSurveyChanged(survey: StaffInductionSurvey) {
        this.staffMember = <StaffMember>this.staffMember.set('inductionSurvey', survey);
    }
}
