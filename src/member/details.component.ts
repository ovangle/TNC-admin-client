import {
    Component, Input, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, provide, NgZone
} from "@angular/core";

import {ROUTER_DIRECTIVES, OnActivate, RouteSegment, Routes} from "@angular/router";
import {ModelHttp, ManagerOptions} from 'caesium-model/manager';

import {AlertLabels} from '../utils/alert_labels.component';

import {Member} from './member.model';
import {MemberManager} from './member.manager';
import {MemberDetailsPageService} from './details_page.service';

import {MemberTermComponent} from './term/term.component';

import {PartnerDetails} from './partner/partner_details.page';
import {DependentList} from './dependent/dependent_list.page';
import {MemberBasicDetails, NamePipe} from "./basic";


@Component({
    selector: 'member-details',
    template: `
        <div class="container-fluid"> 
            <div *ngIf="member" class="page-header">
                <h1>
                    {{member.name | name}} <small>{{member.id}}</small>
                    <a class="btn btn-danger" [routerLink]="['/member']">
                        <i class="fa fa-close"></i>
                    </a>
                </h1>     
                <alert-labels [model]="member"></alert-labels>
            </div>
            <div class="col-md-3">
                <ul class="nav nav-pills nav-stacked">
                    <li [ngClass]="{'active': _isBasicPageActive}">
                        <a [routerLink]="'./'">Basic</a>
                    </li>    
                    <li [ngClass]="{'active': _isPartnerPageActive}">
                        <a [routerLink]="'./partner'">Partner</a>
                    </li>
                    <li [ngClass]="{'active': _isDependentsPageActive}">
                        <a [routerLink]="'./dependent'">Dependents</a>
                    </li>
                </ul>
            </div>
            
            <div class="col-md-9">
                <router-outlet></router-outlet>
            </div>
        </div>
    `,
    styles: [`
    :host {
        height: 100%;
        width: 100%;
        display: block;
        overflow: auto;
    }
    
    h1 > a.btn {
        float: right; 
    }    
    
    li {
        padding: 8px;
        
    }
    
    alert-labels {
        font-size: inherit;        
    }   
    
    input[type=text] {
        width: 100%;
    }
    `],
    styleUrls: [
        'assets/css/bootstrap.css',
        'assets/css/font-awesome.css'
    ],
    directives: [
        AlertLabels, MemberTermComponent, ROUTER_DIRECTIVES
    ],
    pipes: [ NamePipe ],
    providers: [
        MemberManager,
        MemberDetailsPageService
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Routes([
    {path: '/', component: MemberBasicDetails},
    {path: '/partner', component: PartnerDetails},
    {path: '/dependent', component: DependentList}
])
export class MemberDetailsComponent implements OnActivate {
    @Input() member: Member;

    private memberManager: MemberManager;
    private _memberDetailsPageService: MemberDetailsPageService;

    get _isBasicPageActive(): boolean {
        return this._memberDetailsPageService.activePage === MemberBasicDetails;
    }

    get _isPartnerPageActive(): boolean {
        return this._memberDetailsPageService.activePage === PartnerDetails;
    }

    get _isDependentsPageActive(): boolean {
        return this._memberDetailsPageService.activePage === DependentList;
    }

    routerOnActivate(curr: RouteSegment) {
        console.log('MemberDetails.routerOnActivate');
        var id = Number.parseInt(curr.parameters['id']);
        this._memberDetailsPageService.setMemberId(id);

        var response = this.memberManager.getById(id);
        return response.handle<Member>({select: 200, decoder: this.memberManager.modelCodec}).forEach((member) => {
            this.member = member;
        });
    }

    constructor(
        memberManager: MemberManager,
        memberDetailsPageService: MemberDetailsPageService
    ) {
        this.memberManager = memberManager;
        this._memberDetailsPageService = memberDetailsPageService
    }
}
