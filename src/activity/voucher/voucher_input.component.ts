
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
    <style>
   .voucher-value {
        position: fixed;
        bottom: 10px;
    }
    </style>
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
                [disabled]="disabled">
        </eapa-voucher-assessment>
        <div *ngSwitchDefault>
            No voucher type selected 
        </div>
    </div>
    
    <!--
    <div class="voucher-value">
        <strong>Assessed value:</strong> <span>$ {{voucher.getValue()}}</span>
        <button class="btn btn-default" 
                [disabled]="hasErrors">
            <i class="fa fa-save"></i> Submit
        </button>    
    </div>
    -->
    `,
    directives: [EnumSelect2, FoodcareVoucherInput, EAPAVoucherAssessment],
    styleUrls: [
        '../../../assets/css/bootstrap.css',
        '../../../assets/css/font-awesome.css'
    ],
    encapsulation: ViewEncapsulation.Native,
})
export class VoucherInput {
    @Input() member: Member;
    @Output() memberChange = new EventEmitter<Member>();

    @Input() voucher: Voucher;
    @Output() voucherChange = new EventEmitter<Voucher>();

    @Input() disabled: boolean;

}

