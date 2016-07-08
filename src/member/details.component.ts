import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {Subscription} from 'rxjs/Subscription';

import {
    Component, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, provide, NgZone
} from "@angular/core";

import {ROUTER_DIRECTIVES, ActivatedRoute} from "@angular/router";
import {ModelHttp, ManagerOptions} from 'caesium-model/manager';

import {PageHeader} from '../layout/page_header.component';
import {AlertLabels} from '../utils/alert_labels.component';

import {Member} from './member.model';
import {MemberManager} from './member.manager';
import {MemberContext} from './details_context.service';

import {MemberTermComponent} from './term/term.component';

import {PartnerDetails} from './partner/partner_details.page';
import {DependentList} from './dependent/dependent_list.page';
import {VoucherList} from './voucher/voucher_list.page';
import {MemberBasicDetails, NamePipe} from "./basic";


@Component({
    selector: 'member-details',
    template: `
        <div class="container-fluid"> 
            <page-header
                *ngIf="member"
                [title]="member?.name | name"
                [subtitle]="member?.id">
                <div class="btn-group">
                    <button class="btn btn-primary" 
                            [disabled]="saveDisabled"
                            (click)="save()">
                        <i class="fa fa-save"></i> Save
                    </button>
                    <a class="btn btn-danger" [routerLink]="['/member']">
                        <i class="fa fa-close"></i> Close
                    </a>
                </div>
                
                <div class="page-header-extra">
                    <alert-labels [model]="member"></alert-labels> 
                </div>
            </page-header>
            <div class="col-sm-3">
                <ul class="nav nav-pills nav-stacked">
                    <li [ngClass]="{'active': isBasicPageActive}">
                        <a [routerLink]="['./basic']">Basic</a>
                    </li>    
                    <li [ngClass]="{'active': isPartnerPageActive}">
                        <a [routerLink]="['./partner']">Partner</a>
                    </li>
                    <li [ngClass]="{'active': isDependentsPageActive}">
                        <a [routerLink]="['./dependents']">Dependents</a>
                    </li>
                    <li [ngClass]="{'active': isVoucherPageActive}">
                        <a [routerLink]="['./vouchers']">Vouchers</a> 
                    </li>
                </ul>
            </div>
            
            <div class="col-sm-9">
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
        PageHeader,
        AlertLabels, MemberTermComponent, ROUTER_DIRECTIVES
    ],
    pipes: [ NamePipe ],
    providers: [
        MemberManager,
        MemberContext
    ],
    encapsulation: ViewEncapsulation.Native,
})
export class MemberDetailsComponent implements OnInit, OnDestroy {
    member: Member;

    private routeParams: Subscription;
    private memberChange: Subscription;

    private saveDisabled: boolean = true;

    constructor(
        private memberManager: MemberManager,
        private context: MemberContext,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.routeParams = this.route.params
            .map(params => Number.parseInt(params['id']))
            .switchMap(id => {
                return this.memberManager.getById(id)
                    .handle({select: 200, decoder: this.memberManager.modelCodec});
            })
            .subscribe(member => {
                this.context.setMember(member, true);
            });

        this.memberChange = this.context.memberChange.subscribe((member) => {
            this.member = member;
        })
    }

    ngOnDestroy() {
        if (!this.routeParams.isUnsubscribed) {
            this.routeParams.unsubscribe();
        }
        if (!this.memberChange.isUnsubscribed) {
            this.memberChange.unsubscribe();
        }
    }

    private get isBasicPageActive(): boolean {
        return this.context.activePage === MemberBasicDetails;
    }

    private get isPartnerPageActive(): boolean {
        return this.context.activePage === PartnerDetails;
    }

    private get isDependentsPageActive(): boolean {
        return this.context.activePage === DependentList;
    }

    private get isVoucherPageActive(): boolean {
        return this.context.activePage === VoucherList;
    }

}
