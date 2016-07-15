import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {
    Component, OnInit, ViewEncapsulation, ChangeDetectorRef
} from "@angular/core";

import {ROUTER_DIRECTIVES, ActivatedRoute} from "@angular/router";
import {isBlank} from 'caesium-core/lang';
import {ModelHttp, ManagerOptions} from 'caesium-model/manager';

import {PageHeader} from '../layout/page_header.component';
import {AlertLabels} from '../utils/alert_labels.component';
import {ModalDialogService} from '../utils/modal_dialog';

import {Member} from './member.model';
import {MemberManager} from './member.manager';
import {MemberContext} from './details_context.service';

import {MemberTermComponent} from './term/term.component';

import {MemberFileNotes} from './file_notes/file_notes.page';
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
                            (click)="logContact()">
                        <i class="fa fa-heartbeat"></i>        
                        Contact 
                    </button>
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
                    <li [ngClass]="{'active': isFilenotesPageActive}">
                        <a [routerLink]="['./filenotes']">File notes</a>
                    </li>
                    <li [ngClass]="{'active': isVoucherPageActive}">
                        <a [routerLink]="['./vouchers']">Vouchers</a> 
                    </li>
                </ul>
            </div>
            
            <div class="col-sm-9 page-container">
                <router-outlet></router-outlet>
            </div>
        </div>
    `,
    styles: [`
    :host {
        height: 100%;
        width: 100%;
        display: block;
        overflow: hidden;
    }
    
    h1 > a.btn {
        float: right; 
    }    
    
    li {
        padding: 8px;
        
    }
    
    div.container-fluid {
        height: 100%;
    }    
    
    .page-container {
        height: calc(100% - 160px);
    }
    
    div.col-sm-3 {
        height: 100%;
        overflow: scroll;
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
export class MemberDetailsComponent implements OnInit {
    get member(): Member { return this.context.member; }

    private get saveDisabled(): boolean {
        return !(this.context.isDirty && this.context.isValid);
    }

    constructor(
        private memberManager: MemberManager,
        private context: MemberContext,
        private route: ActivatedRoute,
        private modalDialog: ModalDialogService
    ) {
    }

    ngOnInit() {
        this.route.params
            .map(params => Number.parseInt(params['id']))
            .switchMap(id => {
                if (isBlank(this.member) || this.member.id !== +id) {
                    return this.memberManager.getById(id)
                        .handle({select: 200, decoder: this.memberManager.modelCodec})
                }
                return Observable.of(this.member);
            })
            .forEach(member => {
                this.context.setMember(member, true);
                console.log('context member', this.context.member);
            });
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

    private get isFilenotesPageActive(): boolean {
        return this.context.activePage === MemberFileNotes;
    }

    save() {
        return this.context.saveMember();
    }

    logContact() {
        this.modalDialog.activate({
            title: 'Log contact',
            bodyHTML: `
            <div>
                Type of contact
            </div>    
            `
        });
    }

}
