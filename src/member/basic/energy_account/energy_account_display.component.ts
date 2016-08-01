import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {EnergyAccount} from './energy_account.model';
import {EnergyAccountType, ENERGY_ACCOUNT_TYPE_VALUES} from './energy_account_type.model';
import {EnergyRetailer, ENERGY_RETAILER_VALUES} from './energy_retailer.model';

@Component({
    selector: 'energy-account-display',
    template: `
    <div class="row">
        <h3>{{accountType}} Account</h3>
        <ul class="list-unstyled">
            <li class="clearfix">
                <span class="display-label col-sm-4">Retailer</span> 
                <span class="display-value col-sm-8">{{energyRetailer}}</span>
            </li>
        
            <li class="clearfix">
                <span class="display-label col-sm-4">Account number</span> 
                <span class="display-value col-sm-8">{{energyAccount.accountNumber}}</span>
            </li>
        </ul>
    </div>
    `,
    directives: [],
    styleUrls: [
       'assets/css/bootstrap.css',
        'assets/css/details_display.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnergyAccountDisplay {
    @Input() energyAccount: EnergyAccount;

    get energyRetailer(): string {
        return ENERGY_RETAILER_VALUES.get(this.energyAccount.retailer);
    }

    get accountType(): string {
        return ENERGY_ACCOUNT_TYPE_VALUES.get(this.energyAccount.type);
    }
}