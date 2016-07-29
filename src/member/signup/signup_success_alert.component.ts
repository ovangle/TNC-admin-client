import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {NamePipe} from '../basic';
import {Member} from '../member.model';

@Component({
    selector: 'member-signup-success',
    template: `
    <div class="modal-header">
         Member created
    </div>
    <div class="modal-body">
        <p><strong>id</strong> {{member.id}}</p> 
        <p><strong>name</strong> {{member.name | name }}</p>
        <p><strong>expires</strong>{{ member.expires | date }}</p>
    </div> 
    <div class="modal-footer">
        <button class="btn btn-primary" (click)="confirm.emit($event)">OK</button> 
    </div>
    `,
    pipes: [NamePipe, DatePipe],
    styleUrls: [
       'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberSignupSuccess {
    @Input() member: Member;
    @Output() confirm = new EventEmitter<any>();
}
