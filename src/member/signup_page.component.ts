import {Set} from 'immutable';

import {
    Component, EventEmitter, ChangeDetectionStrategy,
    ViewContainerRef, Injector
} from "@angular/core";
import {Router, ActivatedRoute} from '@angular/router';

import {Modal} from '../utils/modal';

import {Member, member} from './member.model';
import {MemberManager} from './member.manager';
import {MemberSignupSuccess} from './signup/signup_success_alert.component';

@Component({
    selector: 'member-signup',
    template: `
    <style>
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
    </style>
    <div class="container">
        <page-header title="Member signup">
            <div class="btn-group">
                <button class="close" (click)="signupCancel()">
                    <i class="fa fa-close"></i>
                </button>    
            </div>
        </page-header>
        
        <div class="input-container">
            <member-input-form
                [displayFields]="_inputDisplayFields"
                (commit)="signupSuccess($event)"
                (cancel)="signupCancel()">
            </member-input-form>
        </div>
    </div>    
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberSignupPage {
    member:Member;
    private _modalClose = new EventEmitter<any>();

    private _inputDisplayFields = Set<string>([
        'term',
        'name',
        'dateOfBirth',
        'gender',
        'aboriginalOrTorresStraitIslander',
        'residentialStatus',
        'address',
        'contact',
        'income',
        'partner'
    ]);

    constructor(private injector: Injector,
                private memberManager:MemberManager,
                private modal:Modal,
                private router:Router,
                private route: ActivatedRoute,
                public view:ViewContainerRef) {
    }

    get instance() {
        return this;
    }

    ngOnInit() {
        this.member = member({});
    }

    signupSuccess(member:Member) {
        this.member = member;
        this.modal.open(
            MemberSignupSuccess,
            this.injector,
            {
                member: this.member,
                confirm: (event: any) => this.navigateToMemberSearch()
            }
        );
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

