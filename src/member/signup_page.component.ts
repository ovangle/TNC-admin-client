import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import {
    Component, ViewEncapsulation, EventEmitter, ChangeDetectionStrategy,
    ViewContainerRef
} from "@angular/core";
import {Router, ActivatedRoute} from '@angular/router';


import {PageHeader} from '../utils/layout/page_header.component';
import {Modal, RemoteComponent} from '../utils/modal';

import {MemberSignupForm} from './signup_form/signup_form.component';
import {MemberSignupSuccess} from './signup_form/signup_success_alert.component';

import {MemberManager} from './member.manager';
import {Member} from './member.model';

@Component({
    selector: 'member-signup',
    template: `
    <div class="container">
        <page-header title="Member signup">
            <div class="btn-group">
                <button class="close" (click)="signupCancel()">
                    <i class="fa fa-close"></i>
                </button>    
            </div>
        </page-header>
        
        <div class="input-container">
            <member-signup-form
                (validityChange)="_formValid = $event"
                (signupSuccess)="signupSuccess($event)"
                (signupCancel)="signupCancel()">
            </member-signup-form>
        </div>
    </div>    
    `,
    styles: [`
    :host {
        display: block;
        height: 100%;
    }    
    .container {
        height: 100%;
    }    
    .input-container {
        height: calc(100% - 140px);
        overflow-y: auto;
        padding-left: 1.2rem;
        padding-right: 1.2rem;
        padding-bottom: 300px;
    }
    `],
    styleUrls: [
        'assets/css/font-awesome.css',
        'assets/css/bootstrap.css'
    ],
    directives: [PageHeader, MemberSignupForm, MemberSignupSuccess],
    providers: [MemberManager],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberSignupPage implements RemoteComponent {
    member:Member;
    private _modalClose = new EventEmitter<any>();

    constructor(private memberManager:MemberManager,
                private modal:Modal,
                private router:Router,
                private route: ActivatedRoute,
                public view:ViewContainerRef) {
    }

    get instance() {
        return this;
    }

    ngOnInit() {
        this.member = this.memberManager.create(Member, {});
    }

    signupSuccess(member:Member) {
        this.member = member;
        this.modal.activate({
            body: MemberSignupSuccess,
            bindings: {
                '[member]': 'member',
                '(confirm)': 'navigateToMemberSearch()'
            },
            remote: this
        }, this._modalClose);
    }

    signupCancel() {
        this.navigateToMemberSearch();
    }

    private navigateToMemberSearch() {
        this.router.navigate(['../'], {relativeTo: this.route}).then((_) => {
            this._modalClose.emit(null);
        });
    }
}

