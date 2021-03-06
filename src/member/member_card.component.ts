import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

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
    directives: [ROUTER_DIRECTIVES],
    pipes: [NamePipe, AddressPipe],
    styles: [
        require('bootstrap/dist/css/bootstrap.css'),
        require('font-awesome/css/font-awesome.css')
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberCard {
    @Input() member: Member;
    @Input() isRemovable: boolean = false;
    @Output() removed = new EventEmitter<any>();
}
