import 'rxjs/add/operator/map';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {UserContext} from '../../../admin/user/context.service';
import {StaffMember} from '../../../admin/staff/staff.model';

import {EnergyAccountBillDisplay} from './bill/bill_display.component';
import {EAPAVoucher} from './eapa_voucher.model';
import {ENERGY_ACCOUNT_TYPE_VALUES} from '../../../member/basic';


@Component({
    selector: 'eapa-voucher-display',
    template: `
    <ul class="list-unstyled">
        <li *ngFor="let accountType of energyAccountTypeValues.keySeq().toArray()">
            <energy-account-bill-display
                *ngIf="voucher.bills.get(accountType)" 
                [bill]="voucher.bills.get(accountType)"></energy-account-bill-display>
        </li>
    </ul>
    `,
    directives: [
        EnergyAccountBillDisplay,
        ROUTER_DIRECTIVES
    ],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EAPAVoucherDisplay {
    private energyAccountTypeValues = ENERGY_ACCOUNT_TYPE_VALUES;

    @Input() voucher: EAPAVoucher;

}
