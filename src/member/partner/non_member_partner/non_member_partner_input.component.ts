import {Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';

import {Partner} from '../partner.model';
import {PartnerInput} from '../partner_input.component';
import {NonMemberPartner} from './non_member_partner.model';

@Component({
    selector: 'non-member-partner-details',
    template: `
    <partner-input [partner]="partner"
                   (partnerChange)="partnerChange.emit($event)"
                   [disabled]="disabled">
    </partner-input>
    `,
    directives: [PartnerInput],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NonMemberPartnerDetails {
    @Input() partner:NonMemberPartner;
    @Output() partnerChange = new EventEmitter<Partner>();

    @Input() disabled:boolean;
}

