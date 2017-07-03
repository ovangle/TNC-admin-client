import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

import {Observable} from 'rxjs/Observable';
import {
    Component, ChangeDetectorRef, ViewChild
} from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';
import {Member} from './member.model';
import {MemberContext} from './member_context.service';
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
    contact-menu-dropdown {
        position: absolute;
        left: 0;
        top: 100%;
    }
    
    .nav-container {
        border-left: 1px solid #eee;
    }
    </style>
    <div class="container">
        <page-header
            leader="Member"
            [title]="_member?.name | name"
            [subtitle]="_member?.id" > 
            <div class="btn-group">
                <button class="btn btn-primary" (click)="contactMenu.toggle()">
                    <i class="fa fa-heartbeat"></i> Contact
                </button>
                <contact-menu-dropdown #contactMenu></contact-menu-dropdown> 
                <button  class="btn btn-primary" (click)="renew()">
                    <i class="fa fa-pencil-square-o"></i> Renew
                </button>
                <a class="btn btn-default" [routerLink]="['..']">
                    <i class="fa fa-close"></i> Close
                </a>
            </div>
            
            <div class="page-header-extra">
                <alert-labels [model]="member | async"></alert-labels> 
            </div>
        </page-header>
        
        <div class="row main-container">
            <div class="col-xs-8 main-content">
                <div class="main">
                    <router-outlet></router-outlet>
                </div>
            </div>    
            <div class="col-xs-4 nav-container" *ngIf="_member">
                <member-term-display 
                        [term]="_member.term"
                        (renew)="renew()"></member-term-display> 
                <!--         
                <file-note-search [member]="_member" [pinned]="true"></file-note-search>
                -->
                <member-details-nav></member-details-nav>
            </div>
        </div>
    </div>
    `,
    providers: [MemberContext],
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
        }).map((member: Member) => {
            this._member = member;
            this.changeDetector.markForCheck();
            return member;
        });
    }

    renew() {
        this.router.navigate(['../../renew', this._member.id || ''], {relativeTo: this.route});
    }

}
