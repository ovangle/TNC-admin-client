import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';
import {DatePipe} from '@angular/common';

import {FoodcareValueDescription} from './foodcare_value_description.pipe';
import {FoodcareVoucher} from './foodcare_voucher.model';

@Component({
    selector: 'foodcare-voucher-details',
    template: `
    <div><strong>value</strong> {{voucher.value | foodcareValueDescription}}</div>
    <div *ngIf="!voucher.redeemed"><strong>expires</strong> {{voucher.expires | date }}</div> 
    <div *ngIf="voucher.redeemed">Redeemed</div>
    `,
    pipes: [DatePipe, FoodcareValueDescription],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoodcareVoucherDetails {
    @Input() voucher: FoodcareVoucher;
}


