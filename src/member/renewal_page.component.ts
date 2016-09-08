import {Observable} from 'rxjs/Observable';

import {
    Component, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ViewContainerRef, ChangeDetectorRef
} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';

import {Modal, RemoteComponent} from '../utils/modal';
import {PageHeader} from '../utils/layout/page_header.component';

import {Member} from './member.model';
import {MemberManager} from './member.manager';

import {NamePipe} from './basic';
import {MemberInputForm} from './member_input/member_input.component';


@Component({
    selector: 'member-renewal-page',
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
        <page-header>
                leader="Renew"
                [title]="member?.name | name"
                [subtitle]="member?.id">
            <div class="btn-group">
                <button class="close"
                    (click)="cancelRenewal()">
                </button>
            </div>
        </page-header>

        <div class="input-container">
            <member-input-form
                [member]="member"
                (commit)="commitRenewal($event)"
                (cancel)="cancelRenewal()">
            </member-input-form>
        </div>
    </div>
    `,
    directives: [
        PageHeader, MemberInputForm
    ],
    pipes: [AsyncPipe, NamePipe],
    providers: [MemberManager],
    styles: [
        require('bootstrap/dist/css/bootstrap.css')
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberRenewalPage implements RemoteComponent {
    private member: Member;
    private _modalClose = new EventEmitter<any>();
    private _formValid: boolean = false;

    constructor(
        private changeDetector: ChangeDetectorRef,
        private memberManager: MemberManager,
        private modal: Modal,
        private router: Router,
        private route: ActivatedRoute,
        public view: ViewContainerRef
    ) { }

    get instance() { return this; }

    ngOnInit() {
        // Should fetch a fresh copy of the member from the db before edit
        this.route.params.switchMap(params => {
            var memberId = Number.parseInt(params['id']);
            var response = this.memberManager.getById(memberId);
            return response.handle({select: 200, decoder: this.memberManager.modelCodec})
        }).forEach(member => {
            this.member = member;
            this.changeDetector.markForCheck();
        });
    }

    cancelRenewal(member: Member) {

    }

    commitRenewal() {

    }
}
