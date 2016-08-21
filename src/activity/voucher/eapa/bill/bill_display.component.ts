import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {EnergyAccountDisplay} from '../../../../member/basic';
import {EnergyAccountBill} from './bill.model';

@Component({
    selector: 'energy-account-bill-display',
    template: `
    <energy-account-display
        class="col-sm-12"
        [energyAccount]="bill.account"
        [allowEdit]="false"></energy-account-display>
    <div class="row">
        <span class="col-sm-4 display-label">Amount on bill</span>
        <span class="col-sm-8 display-value">{{bill.amount}}</span>
    </div>
    `,
    directives: [
        EnergyAccountDisplay
    ],
    styleUrls: [
        'assets/css/bootstrap.css',
        'assets/css/details_display.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnergyAccountBillDisplay {
    @Input() bill: EnergyAccountBill;
}
