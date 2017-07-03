import {Component} from '@angular/core';

import {MemberContext} from '../member_context.service';


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
    <div *ngIf="memberContext.member | async as member">
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
})
export class MemberBasicDetails {
    constructor(private memberContext: MemberContext) {
    }
}
