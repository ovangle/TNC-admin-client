import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {Member} from '../../../member';
import {NamePipe} from '../../../member/basic';

import {FoodcareVoucher} from './foodcare_voucher.model';
import {FoodcareVoucherValueSelect} from './foodcare_value_select.component';

@Component({
    selector: 'foodcare-voucher-input',
    template: `
    <h4>Issue foodcare voucher</h4>
    <div class="row">
        <label class="col-sm-3 control-label">Value</label>
        <foodcare-voucher-value-select 
                class="col-sm-6"
                [value]="voucher.value" 
                (valueChange)="propChanged('value', $event)">
        </foodcare-voucher-value-select>
    </div>
    `,
    directives: [FoodcareVoucherValueSelect],
    pipes: [NamePipe],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoodcareVoucherInput {
    @Input() member: Member;

    @Input() voucher: FoodcareVoucher;
    @Output() voucherChange = new EventEmitter<FoodcareVoucher>();

    private propChanged(prop: string, value: any) {
        this.voucherChange.emit(<FoodcareVoucher>this.voucher.set(prop, value));
    }
}
