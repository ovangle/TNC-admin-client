import 'rxjs/add/operator/switchMap';
import {Subscription} from 'rxjs/Subscription';

import {
    Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef,
    provide
} from "@angular/core";
import {ActivatedRoute} from '@angular/router';

import {YesNoSelect} from '../../utils/components/yesno_select.component';

import {Member} from '../member.model';
import {MemberContext} from '../details_context.service';

import {Partner} from './partner.model';
import {PartnerManager} from './partner.manager';
import {NonMemberPartner, NonMemberPartnerDetails} from './non_member_partner';
import {MemberPartner, MemberPartnerDetails} from './member_partner';

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
    get member(): Member { return this.context.member; }

    constructor(
        private partnerManager: PartnerManager,
        private context: MemberContext,
        private changeDetector: ChangeDetectorRef,
        private route: ActivatedRoute
    ) {
    }

    get isMemberPartner() {
        return this.member.isPartnered && this.member.partner instanceof MemberPartner;
    }

    get isNonMemberPartner() {
        return this.member.isPartnered && this.member.partner instanceof NonMemberPartner;
    }

    ngOnInit() {
        this.route.params.forEach(params => {
            this.context.activePage = PartnerDetails;
            this.changeDetector.markForCheck();
        });
    }


    _initializeMemberPartner(isMemberPartner?: boolean) {
        var partner: Partner;
        if (isMemberPartner && !this.isNonMemberPartner) {
            partner = this.partnerManager.create(MemberPartner, {});
        }
        if (!isMemberPartner && !this.isNonMemberPartner) {
            partner = this.partnerManager.create(NonMemberPartner, {});
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
