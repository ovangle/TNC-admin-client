import {
    Component, Input, Output, ViewEncapsulation, ChangeDetectionStrategy, EventEmitter,
    OnInit

} from 'angular2/core';

import {isBlank} from 'caesium-core/lang';

import {Member, MemberManager} from '../member.model';
import {Partner, NonMemberPartner} from "./partner.record";
import {MemberPartnerInfo} from "./member_partner_info.component";
import {NonMemberPartnerInfo} from './non_member_partner_info.component';
import {RadioButtonState} from "angular2/common";
import {PartnershipStatus, PartnershipStatusInput} from "./partnership_status_input.component";
import {StateException} from "caesium-model/exceptions";

const enum PartnerStatus {
    None,
    NotDisclosed,
    Partnered
}

@Component({
    selector: 'partner-info',
    template: `
    <h3>Partner info</h3>
    <partner-status-input 
        [disabled]="disabled"
        [partnershipStatus]="member?.partnershipStatus"
        (partnershipStatusChange)="_partnershipStatusChanged($event)">
    </partner-status-input>     
    
        
    <div *ngIf="member.isPartnered && _isMemberPartner">
        <member-partner-info 
            [disabled]="disabled"
            [partner]="member.partner"
            (partnerChange)="_partnerChanged($event)">
        </member-partner-info>
    </div>
    
    <div *ngIf="member.isPartnered && !_isMemberPartner">
        <non-member-partner-info 
            [disabled]="disabled"
            [partner]="member.partner"
            (partnerChange)="_partnerChanged($event)">
        </non-member-partner-info>
    </div>
    `,
    styles: [``],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    directives: [PartnershipStatusInput, MemberPartnerInfo, NonMemberPartnerInfo],
    providers: [MemberManager],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerInfoComponent implements OnInit {
    @Input() member: Member;
    @Output() memberChange = new EventEmitter<Member>();

    private _isMemberPartner: boolean;

    _memberManager: MemberManager;

    constructor(memberManager: MemberManager) {
        this._memberManager = memberManager;
    }

    ngOnInit() {
        if (isBlank(this.member))
            throw new StateException('PartnerInfo: member cannot be `null`');
        this._isMemberPartner = this.member.partnershipStatus.isMember;
        this.member.resolvePartner(this._memberManager).map((member) => {
            this.member = member as Member;
        });
    }

    _partnershipStatusChanged(status: PartnershipStatus) {
        this._isMemberPartner = status.isMember;
        this.memberChange.emit(this.member.set('isPartnered', status.isPartnered));
    }

    _partnerChanged(partner: Partner) {
        this.memberChange.emit(this.member.setPartner(partner));
    }

    _partnerPartnered(evt: RadioButtonState) {
    }


}
