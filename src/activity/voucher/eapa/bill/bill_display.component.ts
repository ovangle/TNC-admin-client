import {
    Component, Input, ChangeDetectionStrategy
} from '@angular/core';

import {EnergyAccountBill} from './bill.model';

@Component({
    selector: 'energy-account-bill-display',
    template: `
    <energy-account-display
        class="col-sm-12"
        [energyAccount]="bill.account">
    </energy-account-display>
    <div class="row">
        <span class="col-sm-4 display-label">Amount on bill</span>
        <span class="col-sm-8 display-value">{{bill.amount}}</span>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EAPAVoucherBillDisplay {
    @Input() bill: EnergyAccountBill;
}
