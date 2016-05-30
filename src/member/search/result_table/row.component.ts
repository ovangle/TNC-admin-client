import {Component, Input, ViewEncapsulation, ChangeDetectionStrategy} from 'angular2/core';
import {RouterLink} from "angular2/router";

import {Expander} from "../../../layout/expander.component";
import {DefaultPipe} from '../../../utils/pipes/default.pipe';

import {Member} from '../../member.model';
import {AddressPipe} from "../../basic_info/address.record";
import {AlertLabels} from "../../../utils/alert_labels.component";

@Component({
    selector: 'member-result-table-row',
    template: `
    <expander [disabled]="colHeader" [hidden]="true">
        <header>
            <span *ngIf="colHeader" class="table-cell col-id col-header">Member ID</span>
            <span *ngIf="!colHeader" class="table-cell col-id col-header">{{item.id}}</span>
            
            <span *ngIf="colHeader" class="table-cell col-firstName col-header">First name</span>
            <span *ngIf="!colHeader" class="table-cell col-firstName">{{item.firstName}}</span>
            
            <span *ngIf="colHeader" class="table-cell col-lastName col-header">Last name</span>
            <span *ngIf="!colHeader" class="table-cell col-lastName">{{item.lastName}}</span>
           
            <span *ngIf="colHeader" class="table-cell col-address col-header">Address</span>
            <span *ngIf="!colHeader" class="table-cell col-address">
                {{ item.address | address | default:'Unknown'}} 
            </span>
            <alert-labels *ngIf="!colHeader" class="table-cell" [model]="item"></alert-labels>
        </header>
        <main *ngIf="!colHeader" class="layout horizontal">
            <a [routerLink]="['MemberDetail', {id: item.id}]">View</a>
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

    .col-firstName, .col-lastName {
        width: 10rem;
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
    directives: [Expander, AlertLabels, RouterLink],
    pipes: [AddressPipe, DefaultPipe],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberResultTableRow {
    @Input() colHeader: boolean = false;

    @Input() item: Member;
}
