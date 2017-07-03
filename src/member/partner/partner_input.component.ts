import {OrderedMap} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    OnChanges, SimpleChange
} from '@angular/core';

import {isBlank} from 'caesium-core/lang';

import {Member} from '../member.model';
import {MemberSelect} from '../member_select.component';

import {PartnerCreate} from './partner_create.component';

type PartnerStatus = 'NONE' | 'TNC_MEMBER' | 'NON_TNC_MEMBER';

const PARTNER_STATUS_VALUES = OrderedMap([
    ['NONE', 'None/Not disclosed'],
    ['TNC_MEMBER', 'Current or previous TNC member'],
    ['NON_TNC_MEMBER', 'Never a TNC member']
]);

@Component({
    selector: 'partner-input2',
    template: `
    <fieldset>
        <legend>{{label}}</legend> 
        <enum-select2
            [label]="'Is partnered'"
            [enumValues]="partnerStatusValues"
            [value]="_partnerStatus"  
            (valueChange)="_partnerStatus = $event"></enum-select2>
        
        <div [ngSwitch]="_partnerStatus">
            <div *ngSwitchCase="'NONE'"></div> 
            <div *ngSwitchCase="'TNC_MEMBER'">
                <ng-container *ngComponentOutlet="memberSelect"></ng-container> 
                <member-select [member]="partner" 
                               (memberChange)="partnerChanged($event)">
                </member-select>
            </div>
            <div *ngSwitchCase="'NON_TNC_MEMBER'">
                <partner-create 
                    (save)="partnerChanged($event)"
                    (cancel)="_createCancelled()">
                </partner-create>
            </div>
        </div>
        <div *ngIf="errs.partnerOfSelf" class="help-block">
            A member cannot be their own partner 
        </div>
    </fieldset>    
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerInput {

    private errs = {
        partnerOfSelf: false,
        partnerHasId: false
    };

    private partnerStatusValues = PARTNER_STATUS_VALUES;

    @Input() label: string;

    private _partnerStatus: PartnerStatus = 'NONE';

    /// The member that we're inputting the partner of.
    /// Check that the partner isn't the same as the member.
    @Input() member: Member;

    @Input() partner: Member;
    @Output() partnerChange = new EventEmitter<Member>();

    @Output() validityChange = new EventEmitter<boolean>();

    get isValid(): boolean {
        return !this.errs.partnerOfSelf
            && !this.errs.partnerHasId;
    }

    ngOnInit() {
        if (!isBlank(this.partner)) {
            this._partnerStatus = 'TNC_MEMBER';
        }
    }

    partnerChanged(partner: Member) {
        if (!isBlank(partner)
                && !isBlank(partner.id)
                && partner.id === this.member.id) {
            this.errs.partnerOfSelf = true;
            this.validityChange.emit(false);
        } else {
            this.errs.partnerOfSelf = false;
        }
        this.partnerChange.emit(partner);
        if (!isBlank(partner)) {
            this._partnerStatus = 'TNC_MEMBER';
        }
    }

    private _createCancelled() {
        this._partnerStatus = 'NONE';
    }

}

