import {List} from 'immutable';

import {
    Component, Input, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {AsyncPipe} from '@angular/common';


@Component({
    selector: 'page-header',
    template: `
    <div class="page-header">
        <h1>
            {{title}} 
            <small>{{subtitle}}</small>
        </h1>     
        <div class="btn-group-container">
            <content select=".btn-group"></content>
        </div>
        <content></content>
    </div>
    `,
    directives: [],
    pipes: [AsyncPipe],
    styles: [`
    :host {
        display: block; 
    }
    h1 {
        display: inline-block;
    }    
   
    .btn-group-container {
        margin-top: 22px;
        float: right;
    } 
    `],
    styleUrls: [
        'assets/css/bootstrap.css',
        'assets/css/font-awesome.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHeader {
    @Input() title: string;
    @Input() subtitle: string;
}
