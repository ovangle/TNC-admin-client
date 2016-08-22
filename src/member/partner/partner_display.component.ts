import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {isBlank} from 'caesium-core/lang';

import {Member} from '../member.model';
import {MemberCard} from '../member_card.component';

@Component({
    selector: 'partner-display',
    template: `
    <div class="row">     
        <span class="display-label col-sm-3">Partner</span>
        <span class="display-value col-sm-9" [ngSwitch]="hasPartner">
            <member-card *ngSwitchCase="true" [member]="partner"></member-card>
            <span *ngSwitchCase="false">None/Not disclosed</span>
        </span>
    </div>    
    `,
    directives: [MemberCard],
    styleUrls: [
        '../../../assets/css/bootstrap.css',
        '../../../assets/css/details_display.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerDisplay {
    @Input() partner: Member;

    get hasPartner(): boolean { return !isBlank(this.partner); }

}
