import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {Member} from './member.model';
import {NamePipe, AddressPipe} from './basic';


@Component({
    selector: 'member-card',
    template: `
    <style>
    :host {
        display: block;
    } 
    .btn-group {
        float: right;
    }  
    </style>
    <div class="layout horizontal">
        <a [routerLink]="['/member', 'details', member.id]">{{member.name | name}}</a>

    <!--
    <div class="well">
        <span><a [routerLink]="['/member', member.id]">{{member.name | name}}</a></span>
        <span>{{member.ID}}</span>
        <span>{{member.address | address}}</span>   
    -->    
        
        <span class="btn-group" *ngIf="isRemovable">
            <button class="btn btn-default">
                <i class="fa fa-close"></i> Change
            </button> 
        </span> 
    </div>
    
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberCard {
    @Input() member: Member;
    @Input() isRemovable: boolean = false;
    @Output() removed = new EventEmitter<any>();
}
