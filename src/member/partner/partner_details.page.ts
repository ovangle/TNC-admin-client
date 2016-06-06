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
                      [value]="isPartnered"
                      (valueChange)="_isPartneredChanged($event)">
        </yesno-select>
        
        <div class="checkbox">
            <label *ngIf="isPartnered">
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
    providers: [
        //TODO: Remove. Should only need to provide MemberManager [
        provide(ModelHttp, {useClass: PartnerHttp}),
        ManagerOptions,
        PartnerManager
    ],
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

    get isPartnered(): boolean {
        return this.member.isPartnered;
    }

    get isMemberPartner() {
        return this.isPartnered && this.member.partner instanceof MemberPartner;
    }

    get isNonMemberPartner() {
        return this.isPartnered && this.member.partner instanceof NonMemberPartner;
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

    _isPartneredChanged(isPartnered: boolean) {
        this.member = this.member.set('isPartnered', isPartnered);
    }

    _isMemberPartnerChanged(isMemberPartner: boolean) {
        var partner: Partner;
        if (isMemberPartner && !this.isMemberPartner) {
            partner = this._partnerManager.create(MemberPartner, {
                'member': this._memberDetailsPageService.defaultMember()
            });
        }
        if (!isMemberPartner && !this.isNonMemberPartner) {
            partner = this._partnerManager.create(NonMemberPartner, {});
        }
        this.member = this.member.set('partner', partner);
    }

    _memberPartnerChanged(partner: MemberPartner) {
        this.member = this.member.set('partner', partner);
    }

    _nonMemberPartnerChanged(partner: NonMemberPartner) {
        this.member = this.member.set('partner', partner);
    }
}
