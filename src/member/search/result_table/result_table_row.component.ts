import {Component, Input, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";

import {Expander} from "../../../layout/expander.component";
import {DefaultPipe} from '../../../utils/pipes/default.pipe';

import {Member} from '../../member.model';
import {AddressPipe, NamePipe} from '../../basic';
import {AlertLabels} from "../../../utils/alert_labels.component";
import {PhoneNumberPipe} from "../../../utils/pipes/phone_number.pipe";

@Component({
    selector: 'member-result-table-row',
    template: `
    <expander [disabled]="colHeader" [hidden]="true">
        <header>
            <span *ngIf="colHeader" class="table-cell col-id col-header">Member ID</span>
            <span *ngIf="!colHeader" class="table-cell col-id col-header">
                <a [routerLink]="['./', member.id]">{{member.id}}</a>
            </span>
            
            <span *ngIf="colHeader" class="table-cell col-name col-header">Name</span>
            <span *ngIf="!colHeader" class="table-cell col-name">{{member.name | name}}</span>
            
            <span *ngIf="colHeader" class="table-cell col-address col-header">Address</span>
            <span *ngIf="!colHeader" class="table-cell col-address">
                {{ member.address | address | default:'Unknown'}} 
            </span>
            <alert-labels *ngIf="!colHeader" class="table-cell" [model]="member"></alert-labels>
        </header>
        <main *ngIf="!colHeader" class="layout vertical">
            <div>
                <span>Phone</span>{{member.contact.phone | phone: ['(dd) dddd dddd']}}
            </div>
            <div>
                <span>Mobile</span>{{member.contact.mobile | phone:  ['dddd ddd ddd']}}
            </div>
            <div>
            <span>Email</span>
                <a [href]="member.contact.emailHref">{{member.contact.email}}</a>
            </div>
                
                
                
        </main>
    </expander>
    `,
    styles: [`
    :host {
        display: block;
    }
    
    header {
        font-size: 0; 
        whitespace: nowrap;
    }    
    
    header > * {
        font-size: 1.2rem;
    }
    
    .col-id {
        width: 10rem;
        min-width: 100px;
    }

    .col-name {
        width: 20rem;
    }

    .col-address {
        width: 30rem;
        min-width: 20rem;
    }
    `],
    styleUrls: [
        'src/member/search/result_table/result_table.css',
        'assets/css/bootstrap.css',
        'assets/css/flex.css'
    ],
    directives: [Expander, AlertLabels, ROUTER_DIRECTIVES],
    pipes: [AddressPipe, DefaultPipe, NamePipe, PhoneNumberPipe],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberResultTableRow {
    @Input() colHeader: boolean = false;

    @Input() member: Member;
}
