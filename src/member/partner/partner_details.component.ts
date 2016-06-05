import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation} from "@angular/core";

import {isBlank} from 'caesium-core/lang';

import {YesnoSelect} from '../../utils/components/yesno_select.component';

import {Partner} from './partner.model';
import {PartnerManager} from './partner.manager';
import {MemberPartner} from './member_partner.model';
import {MemberPartnerDetails} from './member_partner_details.component';
import {NonMemberPartner} from './non_member_partner.model';
import {NonMemberPartnerDetails} from './non_member_partner_details.component';

@Component({
    selector: 'member-partner-details',
    template: `
        <yesno-select [label]="'Is partnered'"
                      [value]="isPartnered">
                      (valueChange)="_isPartneredChanged($event)"
        </yesno-select>
        
        <label *ngIf="isPartnered">
            <input type="checkbox" class="checkbox"
                   [ngModel]="isMemberPartner" 
                   (ngModelChange)="_isMemberPartnerChange($event)">
            Partner is TNC member  
        </label>
        
        <div *ngIf="isNonMemberPartner">
            <non-member-partner-details
                [disabled]="disabled"
                [partner]="partner"
                (partnerChange)="partnerChange.emit($event)">
            </non-member-partner-details>
        </div>    
        
        <div *ngIf="isMemberPartner">
            <member-partner-details 
                [disabled]="disabled"
                [partner]="partner" 
                (partnerChange)="partnerChange.emit($event)">
            </member-partner-details>
        </div>
    `,
    styles: [``],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    directives: [
        YesnoSelect,
        MemberPartnerDetails,
        NonMemberPartnerDetails
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.Native
})
export class PartnerDetailsComponent {
    @Input() isPartnered: boolean;
    @Output() isPartneredChange = new EventEmitter<boolean>();

    @Input() partner: Partner;
    @Output() partnerChange = new EventEmitter<Partner>();

    @Input() disabled: boolean;

    get isMemberPartner() {
        return this.isPartnered && this.partner instanceof MemberPartner;
    }

    get isNonMemberPartner() {
        return this.isPartnered && this.partner instanceof NonMemberPartner;
    }

    _partnerManager: PartnerManager;

    constructor(partnerManager: PartnerManager) {
        this._partnerManager = partnerManager;
    }

    _isPartneredChanged(isPartner: boolean) {
        if (isPartner && !this.isNonMemberPartner) {
            this.partnerChange.emit(
                this._partnerManager.create({})
            );
        }
        this.isPartneredChange.emit(isPartner);
    }

    _isMemberPartnerChanged(isMemberPartner: boolean) {
        if (isMemberPartner && !this.isMemberPartner) {
            this.partnerChange.emit(
                this._partnerManager.create({'member': null})
            );
        }
        if (!isMemberPartner && !this.isNonMemberPartner) {
            this.partnerChange.emit(
                this._partnerManager.create({})
            );
        }
    }

}
