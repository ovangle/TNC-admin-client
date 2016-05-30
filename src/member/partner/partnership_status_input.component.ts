import {Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy} from "angular2/core";

import {isBlank} from 'caesium-core/lang';
import {YesnoSelect} from "../../utils/components/yesno_select.component";


export interface PartnershipStatus {
    isPartnered: boolean;
    isMember?: boolean;
}

@Component({
    selector: 'partner-status-input',
    template: `
    <yesno-select [label]="'Partnered'"  
                  [disabled]="disabled"
                  [value]="partnershipStatus.isPartnered"
                  (valueChange)="_isPartnerChanged($event)">
    </yesno-select>
    
    <div class="checkbox">
        <label [ngClass]="{'hidden': _memberHidden}">
            <input type="checkbox" 
                   [ngModel]="!!partnershipStatus.isMember"
                   (ngModelChange)="_isMemberChanged($event)">
            TNC Member
        </label>
    </div>
    `,
    directives: [YesnoSelect],
    styles: [`
    .hidden {
        visibility: hidden;
    }    
    `],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnershipStatusInput {
    @Input() partnershipStatus: PartnershipStatus;
    @Output() partnershipStatusChange = new EventEmitter<PartnershipStatus>();

    get _memberHidden() {
        if (isBlank(this.partnershipStatus) || isBlank(this.partnershipStatus.isPartnered))
            return true;
        return !this.partnershipStatus.isPartnered;
    }

    _isPartnerChanged(value: boolean) {
        this.partnershipStatusChange.emit({isPartnered: value});
    }

    _isMemberChanged(value: boolean) {
        this.partnershipStatusChange.emit({isPartnered: true, isMember: value});
    }
}
