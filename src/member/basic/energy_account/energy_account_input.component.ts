import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {EnergyAccount} from './energy_account.model';
import {EnergyRetailer, EnergyRetailerSelect} from './energy_retailer';

@Component({
    selector: 'energy-account-input',
    template: `
    <fieldset>
        <legend>{{label}}</legend>
        <energy-retailer-select [energyRetailer]="energyAccount.retailer" 
                                (energyRetailerChange)="_retailerChanged($event)"
                                [label]="'Retailer'"
                                [disabled]="disabled">
        </energy-retailer-select>
                                
        <div class="form-group">
            <label for="account-number-input">Account number</label> 
            <input type="text" 
                   [ngModel]="energyAccount.accountNumber"
                   (ngModelChange)="_accountNumberChange($event)">
        </div>                          
       
    </fieldset>
    `,
    directives: [EnergyRetailerSelect],
    styles: [``],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnergyAccountInput {
    @Input() energyAccount: EnergyAccount;
    @Output() energyAccountChange= new EventEmitter<EnergyAccount>();

    @Input() label: string;
    @Input() disabled: boolean;

    _retailerChanged(energyRetailer: EnergyRetailer) {
        this.energyAccountChange.emit(
            <EnergyAccount>(this.energyAccount.set('retailer', energyRetailer))
        );
    }

    _accountNumberChanged(accountNumber: string) {
        this.energyAccountChange.emit(
            <EnergyAccount>(this.energyAccount.set('accountNumber', accountNumber))
        );
    }


}
