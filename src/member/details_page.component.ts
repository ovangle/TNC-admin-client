import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

import {Observable} from 'rxjs/Observable';

import {
    Component, ChangeDetectionStrategy, ViewEncapsulation, Output, EventEmitter,
    ChangeDetectorRef, ViewChild
} from '@angular/core';
import {AsyncPipe} from '@angular/common';

import {Router, ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';

import {isBlank} from 'caesium-core/lang';

import {PageHeader} from '../utils/layout/page_header.component';

import {MemberTermDisplay} from './term';

import {NamePipe} from './basic';
import {Member} from './member.model';
import {MemberManager} from './member.manager';
import {FileNoteSearch} from './file_notes';


export type ActiveDetailsPage = 'BASIC' | 'FILE_NOTES' | 'ACTIVITY';

@Component({
    selector: 'member-details',
    template: `
    <style>
    :host {
        display: block; 
        height: 100%;
    }    
    .container {
        height: 100%; 
    }
    .main-container {
        height: calc(100% - 160px);
        position: relative;
    }    
    .main-content {
        height: 100%;
    }
    .main {
        height: calc(100% - 64px);
        overflow-y: auto;
    }     
    </style>
    <div class="container">
        <page-header
            leader="Member"
            [title]="_member?.name | name"
            [subtitle]="_member?.id" > 
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
            <div class="col-sm-8 main-content">
                <ul class="nav nav-tabs">
                    <li [ngClass]="{'active': _activityActive}">
                        <a [routerLink]="['./activity']">Activity</a>
                    </li>
                    <li [ngClass]="{'active': _basicDetailsActive}">
                        <a [routerLink]="['./basic']">Details</a>
                    </li>
                    <li [ngClass]="{'active': _filenotesActive}">
                        <a [routerLink]="['./filenotes']">File notes</a>
                    </li>
                </ul>
            
                <div class="main">
                    <router-outlet></router-outlet>
                </div>
            </div>    
            <div class="col-sm-4" *ngIf="_member">
                <member-term-display 
                        [term]="_member.term"
                        (renew)="renew()"></member-term-display> 
                <file-note-search [member]="_member" [pinned]="true"></file-note-search>
            </div>
        </div>
    </div>
    `,
    directives: [ROUTER_DIRECTIVES, PageHeader, MemberTermDisplay, FileNoteSearch],
    pipes: [NamePipe, AsyncPipe],
    providers: [MemberManager],
    styleUrls: [
        '../../assets/css/bootstrap.css',
        '../../assets/css/font-awesome.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberDetailsPage {
    private _member: Member;
    private _activePage: ActiveDetailsPage;

    member: Observable<Member>;

    @ViewChild(FileNoteSearch)
    pinnedNotes: FileNoteSearch;

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

    setActivePage(page: ActiveDetailsPage) {
        this._activePage = page;
    }

    private get _basicDetailsActive(): boolean {
        return this._activePage === 'BASIC';
    }

    private get _filenotesActive(): boolean {
        return this._activePage === 'FILE_NOTES';
    }

    private get _activityActive(): boolean {
        return this._activePage === 'ACTIVITY';
    }
}
