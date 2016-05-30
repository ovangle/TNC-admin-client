import {Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy} from 'angular2/core';

import {Member} from '../member.model';
import {MemberSearchComponent} from "../search/search.component";
import {RouterLink} from "angular2/router";

@Component({
    selector: 'member-partner-info',
    template: `
        <div *ngIf="member">
            <a [routerLink]="['Dashboard', 'Member', member.id]"></a>
            <button>Change</button><button>Remove</button>
        </div>
        
        <div *ngIf="!member">
            <member-search [resultDisplay]="'DROPDOWN'">
            </member-search>
        </div>
    `,
    directives: [MemberSearchComponent, RouterLink],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberPartnerInfo {
    @Input() partner: Member;
    @Output() partnerChange = new EventEmitter<Member>();

    searchSelectionChanged(member: Member) {
          
    }
}
