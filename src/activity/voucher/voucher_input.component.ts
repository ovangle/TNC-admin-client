
import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {EnumSelect2} from '../../utils/enum';

import {Member} from '../../member';

import {VoucherType, VOUCHER_TYPE_VALUES} from './voucher_type.model';
import {Voucher} from './voucher.model';
import {VoucherManager} from './voucher.manager';

import {FoodcareVoucher, FoodcareVoucherInput} from './foodcare';
import {EAPAVoucherAssessment} from './eapa';

@Component({
    selector: 'voucher-input',
    template: `
    <div [ngSwitch]="voucher.getType()">
        <foodcare-voucher-input *ngSwitchCase="'FOODCARE'" 
                [member]="member"
                [voucher]="voucher"
                (voucherChange)="voucherChange.emit($event)"
                [disabled]="disabled">
        </foodcare-voucher-input> 
        <eapa-voucher-assessment *ngSwitchCase="'EAPA'" 
                [member]="member"
                [voucher]="voucher"
                (voucherChange)="voucherChange.emit($event)"
                (memberChange)="memberChange.emit($event)"
                (validityChange)="validityChange.emit($event)"
                [disabled]="disabled">
        </eapa-voucher-assessment>
        <div *ngSwitchDefault>
            No voucher type selected 
        </div>
    </div>
    
    <div class="voucher-value">
    <strong>Assessed value:</strong> \${{voucher.getValue()}} 
    </div>
    `,
    directives: [EnumSelect2, FoodcareVoucherInput, EAPAVoucherAssessment],
    styles: [`
    .voucher-value {
        position: fixed;
        bottom: 10px;
    }
    `],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    //changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoucherInput {
    @Input() member: Member;
    @Output() memberChange = new EventEmitter<Member>();

    @Input() voucher: Voucher;
    @Output() voucherChange = new EventEmitter<Voucher>();
    @Output() validityChange = new EventEmitter<boolean>();

    @Input() disabled: boolean;

}

