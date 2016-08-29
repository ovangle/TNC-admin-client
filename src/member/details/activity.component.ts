import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {ParameterBuilder} from '../../utils/search';


import {Member} from '../member.model';
import {MemberDetailsPage} from '../details_page.component';

@Component({
    selector: 'member-activity',
    template: `
    <style>
    :host { display: block; }  
    </style>
    <div class="col-sm-12">
        <router-outlet></router-outlet>
    </div>
    `,
    directives: [ROUTER_DIRECTIVES],
    styleUrls: [
        '../../../assets/css/bootstrap.css'
    ],
    providers: [],
    encapsulation: ViewEncapsulation.Native
})
export class MemberActivity {
    private member: Member;

    constructor(private memberDetailsPage: MemberDetailsPage) { }

    ngOnInit() {
        this.memberDetailsPage.member.forEach(member => {
            this.member = member;
            this.memberDetailsPage.setActivePage('ACTIVITY');
        });
    }
}
