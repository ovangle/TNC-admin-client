import 'rxjs/add/operator/do';
import {Observable} from 'rxjs/Observable';
import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ChangeDetectorRef
} from '@angular/core';

import {AsyncPipe} from '@angular/common';

import {Member} from '../member.model';
import {MemberManager} from '../member.manager';
import {MemberDetailsPage} from '../details_page.component';

import {
    ContactDisplay, IncomeDisplay, ResidentialStatusDisplay, EnergyAccountDisplay
} from '../basic';
import {PartnerDisplay} from '../partner/partner_display.component';
import {DependentListDisplay} from '../dependents/dependent_list_display.component';

@Component({
    selector: 'member-basic-details',
    template: `
    <style>
    :host {
        display: block; 
        height: 100%
        overflow-y: auto;
    }
    </style>
    <div *ngIf="member" class="col-sm-12">
    <!-- TODO: Change this name -->
        <contact-display [contact]="member.contact"></contact-display>  
        <residential-status-display
                [status]="member.residentialStatus"
                [address]="member.address"></residential-status-display>
        <income-display [income]="member.income"></income-display>
        <div *ngIf="member.gasAccount">
            <energy-account-display [energyAccount]="member.gasAccount"></energy-account-display>
        </div> 
        <div *ngIf="member.electricityAccount">
            <energy-account-display [energyAccount]="member.electricityAccount"></energy-account-display> 
        </div>
            
        <div>
            <h3>Household</h3> 
            <partner-display [partner]="member.partner"></partner-display>
            <dependent-list-display [carer]="member" [dependents]="member.dependents">
            </dependent-list-display>
        </div>
    </div>
        
    `,
    directives: [
        ContactDisplay, ResidentialStatusDisplay, IncomeDisplay,
        EnergyAccountDisplay, PartnerDisplay, DependentListDisplay
    ],
    styleUrls: [
        '../../../assets/css/bootstrap.css'
    ],
    pipes: [AsyncPipe],
    encapsulation: ViewEncapsulation.Native
})
export class MemberBasicDetails {
    private member: Member;

    constructor(
        private memberManager: MemberManager,
        private memberDetailsPage: MemberDetailsPage) {
    }

    ngOnInit() {
        this.memberDetailsPage.member
            .concatMap(member => member.resolvePartner(this.memberManager)).forEach(member => {
                this.memberDetailsPage.setActivePage('BASIC');
                this.member = member;
            });
    }

    private renew() {
        this.memberDetailsPage.renew();
    }
}
