import {
    Component, Input, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, provide, NgZone
} from "angular2/core";

import {Router, RouteParams, RouterLink} from "angular2/router";
import {ModelHttp, ManagerOptions} from 'caesium-model/manager';

import {AlertLabels} from '../utils/alert_labels.component';

import {Member, MemberManager} from './member.model';
import {MemberHttp} from './member_http';

import {MemberBasicInfoComponent} from './basic_info/basic_info.component';
import {ContactInfoComponent} from './contact/contact_info.component';
import {IncomeInfoComponent} from './income/income_info.component';
import {MemberTermComponent} from './term/term.component';
import {PartnerInfoComponent} from './partner/partner_info.component';
import {HTTP_PROVIDERS} from "angular2/http";


@Component({
    selector: 'member-details',
    template: `
        <div *ngIf="member" class="container-fluid"> 
            <div *ngIf="displayPageHeader" class="page-header">
                <h1>
                    {{member.firstName}} {{member.lastName}} <small>{{member.id}}</small>
                    <button class="btn" [routerLink]="['Search']">
                        <i class="fa fa-close"></i>
                    </button>
                </h1>     
                <alert-labels [model]="member"></alert-labels>
            </div>
            <div class="main">
            <div class="row">
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
                    <partner-info [member]="member"
                                  (memberChange)="member = $event"></partner-info> 
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
    
    h1 > button.btn {
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
        IncomeInfoComponent, PartnerInfoComponent, RouterLink
    ],
    providers: [
        //TODO: Remove. Should only need to provide MemberManager
        provide(ModelHttp, {useClass: MemberHttp}),
        ManagerOptions,
        MemberManager
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberDetailsComponent implements OnInit {
    @Input() member: Member;

    /**
     * Whether the page header should be displayed.
     * @type {boolean}
     */
    @Input() displayPageHeader: boolean = true;

    private router: Router;
    private routeParams: RouteParams;
    private memberManager: MemberManager;
    private _zone: NgZone;
    private _changeDetector: ChangeDetectorRef;

    ngOnInit() {

    }

    constructor(
        router: Router,
        routeParams: RouteParams,
        memberManager: MemberManager,
        changeDetector: ChangeDetectorRef,
        zone: NgZone
    ) {
        this.router = router;
        this.routeParams = routeParams;
        this.memberManager = memberManager;
        this._changeDetector = changeDetector;
        this._zone = zone;

        let id = Number.parseInt(this.routeParams.get('id'));
        var response = this.memberManager.getById(id);
        response.handle({select: 200, decoder: this.memberManager.modelCodec}).forEach((member) => {
            this.member = member;
            this._changeDetector.markForCheck();
        }, this);
        //TODO: handle not found.
    }
}
