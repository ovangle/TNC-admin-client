import {
    Component, Input, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, provide, NgZone
} from "@angular/core";

import {ROUTER_DIRECTIVES, OnActivate, RouteSegment} from "@angular/router";
import {ModelHttp, ManagerOptions} from 'caesium-model/manager';

import {AlertLabels} from '../utils/alert_labels.component';

import {Member, MemberManager} from './member.model';
import {MemberHttp} from './member_http';

import {MemberBasicInfoComponent} from './basic_info/basic_info.component';
import {ContactInfoComponent} from './contact/contact_info.component';
import {IncomeInfoComponent} from './income/income_info.component';
import {MemberTermComponent} from './term/term.component';

import {PartnerDetailsComponent} from 'partner/partner_details.component';
import {PartnerManager} from 'partner/partner.manager';


@Component({
    selector: 'member-details',
    template: `
        <div *ngIf="member" class="container-fluid"> 
            <div *ngIf="displayPageHeader" class="page-header">
                <h1>
                    {{member.firstName}} {{member.lastName}} <small>{{member.id}}</small>
                    <a class="btn btn-danger" [routerLink]="['/member']">
                        <i class="fa fa-close"></i>
                    </a>
                </h1>     
                <alert-labels [model]="member"></alert-labels>
            </div>
            <div class="col-md-3">
                <ul class="nav nav-pills nav-stacked">
                    <li role="presentation" class="active"><a href="javascript:void()">Basic</a></li>
                    <li role="presentation">Partner</li>
                    <li role="presentation">Dependents</li>
                </ul>
            </div>
            <div class="col-md-5">
                <member-basic-info [member]="member"
                                       (memberChange)="member = $event"></member-basic-info>
                <income-info [incomeInfo]="member.income"></income-info>
            </div>
            <div class="col-md-4">
                <contact-info [contactInfo]="member.contact"></contact-info>
            </div>
                <div class="col-md-3">
                    <member-term [term]="member.term"></member-term>
                </div>
                
                <div class="col-md-7">
                    <member-partner-details [member]="member"
                                            (memberChange)="member = $event"></member-partner-details> 
                    <!-- 
                    <h3>Client assistance log</h3>       
                    <input placeholder="filters" type="text">
                    <ul class="list-unstyled">
                        <li>#Date #Staffmember Issued food voucher $20<br/>
                            <small>#NotesAboutContact</small>
                        </li>
                        <li>#Date #Staffmember Issued EAPA voucher $250<br/>
                            <small>#NotesAboutContact</small>
                        </li>
                    </ul>
                    -->
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
        AlertLabels, MemberBasicInfoComponent, ContactInfoComponent, MemberTermComponent,
        IncomeInfoComponent, PartnerDetailsComponent, ROUTER_DIRECTIVES
    ],
    providers: [
        //TODO: Remove. Should only need to provide MemberManager
        provide(ModelHttp, {useClass: MemberHttp}),
        ManagerOptions,
        MemberManager,
        PartnerManager
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberDetailsComponent implements OnActivate {
    @Input() member: Member;

    /**
     * Whether the page header should be displayed.
     * @type {boolean}
     */
    @Input() displayPageHeader: boolean = true;

    private memberManager: MemberManager;
    private _zone: NgZone;
    private _changeDetector: ChangeDetectorRef;

    routerOnActivate(curr: RouteSegment) {
        var id = Number.parseInt(curr.parameters['id']);
        var response = this.memberManager.getById(id);
        response.handle({select: 200, decoder: this.memberManager.modelCodec}).forEach((member) => {
            this.member = member;
            this._changeDetector.markForCheck();
        });
    }

    constructor(
        memberManager: MemberManager,
        changeDetector: ChangeDetectorRef,
        zone: NgZone
    ) {
        this.memberManager = memberManager;
        this._changeDetector = changeDetector;
        this._zone = zone;
    }
}
