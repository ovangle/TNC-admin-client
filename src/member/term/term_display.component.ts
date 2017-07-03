import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {OrElsePipe} from '../../utils/pipes';

import {MEMBER_TERM_TYPE_VALUES} from './term_type.model';
import {MemberTerm} from './term.model';

@Component({
    selector: 'member-term-display',
    template: `
    <style>
    :host {
        display: block;
    }
    .member-type {
        margin-bottom: 10px;
    }    
    .term-actions {
        margin-top: 5px; 
    }
    
    .display-label {
        padding-right: 0;
    }
    </style>
    <div class="alert alert-warning">
        <div class="member-type"><strong>{{termType}} member</strong></div>

        <ul class="list-unstyled">
            <li class="clearfix">
                <span class="display-label col-sm-4">Joined</span>
                <span class="display-value col-sm-8">{{term.joined | date}}</span>
            </li>
            <li class="clearfix">
                <span class="display-label col-sm-4">Renewed</span>
                <span class="display-value col-sm-8">{{term.renewed | date | orElse: 'Never'}}</span>
            </li>
            <li class="clearfix">
                <span class="display-label col-sm-4">Expires</span>
                <span class="display-value col-sm-8">{{term.expires | date}}</span>
            </li>
        </ul>
        <!--
        <div class="clearfix term-actions">
            <button class="btn btn-default btn-renew pull-right"
                    (click)="renew.emit(true)">
                <i class="fa fa-pencil-square-o"></i> Renew
            </button>
        </div>
        -->
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberTermDisplay {
    @Input() term: MemberTerm;
    @Output() renew = new EventEmitter<any>();

    get termType(): string {
        return MEMBER_TERM_TYPE_VALUES.get(this.term.type);
    }

}
