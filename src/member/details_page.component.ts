import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

import {Observable} from 'rxjs/Observable';

import {
    Component, ChangeDetectionStrategy, ViewEncapsulation, Output, EventEmitter,
    ChangeDetectorRef
} from '@angular/core';
import {AsyncPipe} from '@angular/common';

import {Router, ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';

import {isBlank} from 'caesium-core/lang';


import {PageHeader} from '../utils/layout/page_header.component';

import {MemberTermDisplay} from './term';

import {NamePipe} from './basic';
import {Member} from './member.model';
import {MemberManager} from './member.manager';

@Component({
    selector: 'member-details',
    template: `
    <div class="container">
        <page-header
            leader="Member"
            [title]="_member?.name | name"
            [subtitle]="_member?.id">
            <div class="btn-group">
                <button class="btn btn-primary"
                        (click)="logContact()">
                    <i class="fa fa-heartbeat"></i> Contact
                </button>
                <button  class="btn btn-primary" (click)="renew()">
                    <i class="fa fa-pencil-square-o"></i> Renew
                </button>
                <a class="btn btn-default" [routerLink]="['..']">
                    <i class="fa fa-close"></i> Close
                </a>
            </div>
            
            <div class="page-header-extra">
                <alert-labels [model]="member"></alert-labels> 
            </div>
        </page-header>
        
        <div class="row main-container">
            <div class="col-sm-2">
                <ul class="nav nav-pills nav-stacked">
                    <li [ngClass]="{'active': detailsActive}">
                        <a [routerLink]="['.']">Details</a>
                    </li>
                </ul>
            
            </div>
            
            <div class="col-sm-6 main">
                <router-outlet></router-outlet>
            </div>    
            <div class="col-sm-4">
                <member-term-display 
                        [term]="_member?.term"
                        (renew)="renew()"></member-term-display> 
            </div>
        </div>
    </div>
    `,
    directives: [ROUTER_DIRECTIVES, PageHeader, MemberTermDisplay],
    pipes: [NamePipe, AsyncPipe],
    providers: [MemberManager],
    styles: [`
    :host {
        display: block; 
        height: 100%;
    }    
    .container {
        height: 100%; 
    }    
    .main-container {
        height: calc(100% - 160px);
    }    
    
    .main {
        height: 100%;  
        overflow-y: auto;
    }    
    `],
    styleUrls: [
        'assets/css/font-awesome.css',
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberDetailsPage {
    private _member: Member;

    member: Observable<Member>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private memberManager: MemberManager,
        private changeDetector: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.member = this.route.params.concatMap(params => {
            let id = params['id'];
            let response = this.memberManager.getById(id);
            return response.handle({select: 200, decoder: this.memberManager.modelCodec})
        }).map(member => {
            this._member = member;
            this.changeDetector.markForCheck();
            return member;
        });
    }

    renew() {
        this.router.navigate(['../../renew', this._member.id || ''], {relativeTo: this.route});
    }

}
