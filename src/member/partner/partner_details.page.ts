import 'rxjs/add/operator/toPromise';

import {
    Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef,
    provide
} from "@angular/core";
import {RouteSegment} from '@angular/router';

import {YesNoSelect} from '../../utils/components/yesno_select.component';

import {Member} from '../member.model';
import {MemberDetailsPageService} from '../details_page.service';

import {Partner} from './partner.model';
import {PartnerManager} from './partner.manager';
import {NonMemberPartner, NonMemberPartnerDetails} from './non_member_partner';
import {MemberPartner, MemberPartnerDetails} from './member_partner';

//TODO: Remove
import {ModelHttp, ManagerOptions} from 'caesium-model/manager';
import {PartnerHttp} from './partner_http';

@Component({
    selector: 'partner-details',
    template: `
        <yesno-select [label]="'Is partnered'"
                      [value]="member.isPartnered"
                      (valueChange)="_isPartneredChanged($event)">
        </yesno-select>
        
        <div class="checkbox">
            <label *ngIf="member.isPartnered">
                <input type="checkbox" 
                       [ngModel]="isMemberPartner" 
                       (ngModelChange)="_isMemberPartnerChanged($event)">
                Partner is TNC member  
            </label>
        </div>
        
        <div *ngIf="isNonMemberPartner">
            <non-member-partner-details
                [disabled]="disabled"
                [partner]="member.partner"
                (partnerChange)="_nonMemberPartnerChanged($event)">
            </non-member-partner-details>
        </div>    
        
        <div *ngIf="isMemberPartner">
            <member-partner-details 
                [disabled]="disabled"
                [member]="member"
                [partner]="member.partner" 
                (partnerChange)="_memberPartnerChanged($event)">
            </member-partner-details>
        </div>
    `,
    styles: [``],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    directives: [
        YesNoSelect,
        MemberPartnerDetails,
        NonMemberPartnerDetails
    ],
    providers: [PartnerManager],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.Native
})
export class PartnerDetails {
    member: Member;

    _partnerManager: PartnerManager;
    _memberDetailsPageService: MemberDetailsPageService;
    _changeDetector: ChangeDetectorRef;

    constructor(
        partnerManager: PartnerManager,
        memberDetailsPageService: MemberDetailsPageService,
        changeDetector: ChangeDetectorRef
    ) {
        this._partnerManager = partnerManager;
        this._memberDetailsPageService = memberDetailsPageService;
        this.member = memberDetailsPageService.defaultMember();
        this._changeDetector = changeDetector;
    }


    get isMemberPartner() {
        return this.member.isPartnered && this.member.partner instanceof MemberPartner;
    }

    get isNonMemberPartner() {
        return this.member.isPartnered && this.member.partner instanceof NonMemberPartner;
    }

    routerOnActivate(segment: RouteSegment) {
        this._memberDetailsPageService.activePage = PartnerDetails;
        this._memberDetailsPageService.getMember().then((member) => {
            return member.resolvePartner(this._partnerManager).toPromise();
        }).then((member: Member) => {
            this.member = member;
            this._changeDetector.markForCheck();
        });
    }

    _initializeMemberPartner(isMemberPartner?: boolean) {
        var partner: Partner;
        if (isMemberPartner && !this.isNonMemberPartner) {
            partner = this._partnerManager.create(MemberPartner, {
                '_partner': this._memberDetailsPageService.defaultMember()
            });
        }
        if (!isMemberPartner && !this.isNonMemberPartner) {
            partner = this._partnerManager.create(NonMemberPartner, {});
        }
        this.member = this.member.set('partner', partner);
    }

    _isPartneredChanged(isPartnered: boolean) {
        this.member = this.member.set('isPartnered', isPartnered);
        this._initializeMemberPartner(false);
    }

    _isMemberPartnerChanged(isMemberPartner: boolean) {
        this._initializeMemberPartner(isMemberPartner);
    }

    _memberPartnerChanged(partner: MemberPartner) {
        this.member = this.member.set('partner', partner);
    }

    _nonMemberPartnerChanged(partner: NonMemberPartner) {
        this.member = this.member.set('partner', partner);
    }
}
