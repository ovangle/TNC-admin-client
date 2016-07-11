import {Map} from 'immutable';

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
                                (energyRetailerChange)="propChanged('retailer', $event)"
                                [label]="'Retailer'"
                                [disabled]="disabled">
        </energy-retailer-select>
                                
        <div class="form-group">
            <label for="account-number-input">Account number</label> 
            <input type="text" class="form-control"
                   [ngModel]="energyAccount.accountNumber"
                   (ngModelChange)="propChanged('accountNumber', $event)">
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
    @Output() validityChange = new EventEmitter<boolean>();

    @Input() label: string;
    @Input() disabled: boolean;

    private _propValidity = Map<string,boolean>({
        energyAccount: true,
        accountNumber: true
    });

    get isValid(): boolean {
        return this._propValidity.valueSeq().every((v) => v);
    }

    propChanged(prop: string, value: any) {
        this.energyAccountChange.emit(
            <EnergyAccount>this.energyAccount.set(prop, value)
        );
    }

    propValidityChanged(prop: string, validity: boolean) {
        this._propValidity = this._propValidity.set(prop, validity);
        this.validityChange.emit(this.isValid);
    }

}
