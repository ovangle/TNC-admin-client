import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {SearchResult} from 'caesium-model/manager';

import {StaffMember} from '../../staff.model';
import {StaffTypePipe} from '../../type';
import {NamePipe} from "../../../../member/basic";

@Component({
    selector: 'staff-search-result-table-row',
    template: `
    <span *ngIf="colHeader" class="table-cell col-id col-header">Staff ID</span>
    <span *ngIf="!colHeader" class="table-cell col-id"><a [routerLink]="['.', staffMember.id]">{{staffMember.id}}</a></span>
    
    <span *ngIf="colHeader" class="table-cell col-type col-header">Staff type</span>
    <span *ngIf="!colHeader" class="table-cell col-type">{{staffMember.type | staffType}}</span>
    
    <span *ngIf="colHeader" class="table-cell col-name col-header">Name</span>
    <span *ngIf="!colHeader" class="table-cell col-name">{{staffMember.name | name}}</span>
    
    `,
    directives: [ROUTER_DIRECTIVES],
    pipes: [NamePipe, StaffTypePipe],
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
    
    .col-type {
        width: 15rem;
    }

    .col-name {
        width: 20rem;
    }

    `],
    //TODO Move search table css to assets
    styleUrls: [
       'src/member/search/result_table/result_table.css',
       'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffSearchResultTableRow {
    @Input() staffMember: StaffMember;
    @Input() colHeader: boolean = false;

    ngOnInit() {
        console.log('Staff member: ', this.staffMember);
    }


}
