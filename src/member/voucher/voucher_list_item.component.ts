import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import {DatePipe} from '@angular/common';

import {Voucher} from './voucher.model';
import {EAPAVoucher, EAPAVoucherDetails} from './eapa';
import {FoodcareVoucher, FoodcareVoucherDetails} from './foodcare';

import {DateCard} from '../../utils/date/date_card.component';

@Component({
    selector: 'voucher-list-item',
    template: `
    <date-card [date]="voucher.dateIssued"></date-card>
    <div class="flex">
        <h4>{{voucher.getDisplayType()}}</h4>
        <div *ngIf="_isEAPAVoucher">
            <eapa-voucher-details 
                [voucher]="voucher"></eapa-voucher-details>
        </div>
        
        <div *ngIf="_isFoodcareVoucher">
            <foodcare-voucher-details
                [voucher]="voucher">
                
            </foodcare-voucher-details>
        </div>
    </div>
    `,
    directives: [DateCard, EAPAVoucherDetails, FoodcareVoucherDetails],
    styles: [`
    :host {
        display: flex;
        border-radius: .5rem;
        background-color: #e8e8e8;
        
        overflow: hidden;
    }
    
    date-card {
        margin-right: 1rem;
    }
    
    
    
    `],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoucherListItem {
    @Input() voucher: Voucher;

    ngOnInit() {
        console.log('Voucher', this.voucher);
        console.log('date issued: ', this.voucher.dateIssued);
    }

    get _isEAPAVoucher() {
        return this.voucher instanceof EAPAVoucher;
    }

    get _isFoodcareVoucher() {
        return this.voucher instanceof FoodcareVoucher;
    }
}
