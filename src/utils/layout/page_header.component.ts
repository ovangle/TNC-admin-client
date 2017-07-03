import {List} from 'immutable';

import {
    Component, Input, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {AsyncPipe} from '@angular/common';



@Component({
    selector: 'page-header',
    template: `
    <style>
    :host {
        display: block; 
    }
    h1 {
        display: inline-block;
    }    
    /*
    .page-header {
        border-bottom: 0; 
    }
    */
    
    .page-header > h4 {
        color: #999;
    }
    
    .btn-group-container {
        margin-top: 22px;
        float: right;
    }  
    </style>
    <div class="page-header">
        <h4 *ngIf="leader">{{leader}}</h4> 
        <h1>
            {{title}} 
            <small>{{subtitle}}</small>
        </h1>     
        <div class="btn-group-container">
            <ng-content select=".btn-group"></ng-content>
        </div>
        <ng-content></ng-content>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHeader {
    @Input() leader: string;
    @Input() title: string;
    @Input() subtitle: string;
}
